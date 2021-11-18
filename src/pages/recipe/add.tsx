import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'
import Navbar from '../../components/navbar'

const RecipeAdd: NextPage = () => {
  const router = useRouter()
  const [namaRecipe, setnamaRecipe] = useState('');
  const [error, seterror] = useState('');
  const [deskripsiRecipe, setdeskripsiRecipe] = useState('');
  const [listMaterial, setlistMaterial] = useState([]);
  const [listMaterialInput, setlistMaterialInput] = useState([{materialName:'', countMaterial:0}])

  useEffect ( () => {
    axios.get('http://localhost:4000/getAllMaterial').then(res => {
      setlistMaterial(res.data.part)
    })
  }, [router])
    const onsubmit = async (e) => {
      e.preventDefault()
      // Ambil Copy dan ubah menjadi list of object dari nama material menjadi id Material
      if (namaRecipe == ''){ // check empty recipe name
        seterror('Please Input the recipe name')
        return
      }
      if (deskripsiRecipe == ''){ // check empty recipe desc
        seterror('Please Input the recipe description')
        return
      }
      let items = [...listMaterialInput];
      console.log(listMaterialInput)
      console.log(items)
      for (let i=0; i< items.length; i++){
        let item = {...items[i]};
        item.materialName = findMaterialId(listMaterialInput[i].materialName) // Change from nama to Id
        items[i] = item;
        // items[i].materialName = findMaterialId(listMaterialInput[i].materialName) // Change from nama to Id
        if (+item.materialName == -1){ // Item not selected
          seterror('Please Input the right Material')
          return
        }
        if (item.countMaterial <= 0){ // jumlah 0
          seterror('Please Input the right amount (ingredient > 0)')
          return
        }
      }
      console.log(items)
      let obj = {namaRecipe: namaRecipe, deskripsiRecipe: deskripsiRecipe, dataRecipe:items}
      await axios.post('http://localhost:4000/addRecipe',obj).then(res => {
        if (res.data.err){
          seterror('Failed to add Recipe, please make sure your input is correct')
        }else {
          seterror('Success adding new Recipe')
          setnamaRecipe('')
          setdeskripsiRecipe('')
          setlistMaterialInput([{materialName:'', countMaterial:0}])
        }
      })
    }
    const pushNewItem = () => {
      setlistMaterialInput([...listMaterialInput,{materialName:'', countMaterial:0}])
      // console.log(listMaterialInput)
    }
    const changeMaterialName = (index,name) => {
      let items = [...listMaterialInput];
      let item = {...items[index]};
      item.materialName = name;
      items[index] = item;
      setlistMaterialInput(items);  
      // console.log(index)  
      // console.log(listMaterialInput)  
    }
    const changeMaterialCount = (index,count) => {
      let items = [...listMaterialInput];
      let item = {...items[index]};
      item.countMaterial = count;
      items[index] = item;
      setlistMaterialInput(items);  
      // console.log(index)  
      // console.log(listMaterialInput)            
    }
    const deleteIndex = (i) => {
      if (listMaterialInput.length > 1){
        let items = [...listMaterialInput];
        items.splice(i,1)
        setlistMaterialInput(items)
      }
    }
    const containMaterialname = (name) => {
      for (let i = 0; i<listMaterialInput.length;i++){
        if (listMaterialInput[i].materialName === name){
          return true
        }
      }
      return false
    }
    const findMaterialId = (namaMaterial) => {
      for (let j =0; j< listMaterial.length; j++){
        // console.log(namaMaterial)
        // console.log(listMaterial[j].material_name)
        // console.log(listMaterial[j])
        if (namaMaterial == listMaterial[j].material_name){
          return listMaterial[j].id_material
        }
      }
      return -1;
    }
  return(
    <>
      <Head>
      <title>Add New Recipe</title>
      <meta name="description" content="Dorayaki factory"/>
      </Head>
      <div className="flex flex-col h-[100vh]">
      <Navbar />
        <div className="flex bg-blue-300 h-[100vh] w-[100vw] bg-default bg-cover items-center text-center justify-center flex-auto">
          <div className="flex flex-col w-100 h-[36rem] overflow-auto bg-dongker text-white py-6 px-8 rounded-xl">
            <span className="mx-auto font-title text-4xl mb-10">Add New Recipe</span>
            <input type="text" placeholder="Recipe Name" value={namaRecipe} onChange ={(e) => setnamaRecipe(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <textarea placeholder="Recipe Description" value={deskripsiRecipe} onChange ={(e) => setdeskripsiRecipe(e.target.value)} className="min-h-[12rem] px-2 py-1 rounded-md my-2 text-black"  />
             {listMaterialInput.map((e, i) => 
            <div key={i} className="flex flex-row text-black">
              <select className="w-[100%]  px-2 py-1 rounded-md my-2" placeholder="Material Name" value={listMaterialInput[i].materialName} onChange={(f) => changeMaterialName(i,f.target.value)}> 
                <option value="-">Choose Material</option>
                {listMaterial.map(item => {     
                  if(!containMaterialname(item.material_name)){                
                    return <option key={item.id_Material} value={item.material_name}>{item.material_name}</option>
                  } else{
                    return <option hidden key={item.id_Material} value={item.material_name}>{item.material_name}</option>
                  }     
                })}
              </select>
              <input onChange={(f) => changeMaterialCount(i,+f.target.value)} className="w-[40%] mx-3  px-2 py-1 rounded-md my-2" type="number" placeholder="0" value={listMaterialInput[i].countMaterial} />
              <button onClick={(f) => deleteIndex(i)} className="w-12 bg-close bg-contain px-2 py-1 rounded-md my-2"></button>
            </div>
            )}
            <button onClick={pushNewItem} className="flex items-center justify-center mx-auto my-4 bg-blue_button hover:bg-blue-600 duration-200 rounded-full text-white text-2xl p-3 h-10 w-10">
              {/* <div className="bg-close w-8 h-8 bg-contain"></div> */}
              <Image  src="/images/plus.svg" width={20} height={20} alt='' className=""></Image>
            </button>
            <span className="mx-auto font-title text-md mb-5 text-light_blue">{error}</span>
            <button onClick={onsubmit} className="ml-auto my-2 bg-blue_button hover:bg-blue-600 duration-200 rounded-lg text-white text-lg px-2 h-10 w-32 right-0">Add Recipe</button>
          </div>
        </div>

      </div>
    </>
  )
}


export default RecipeAdd;