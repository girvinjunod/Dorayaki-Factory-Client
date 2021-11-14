import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'

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
      let obj = {namaRecipe: namaRecipe, deskripsiRecipe: deskripsiRecipe, dataRecipe:}
      await axios.post('http://localhost:4000/addRecipe',obj).then(res => {
        if (res.data.err){
          seterror('Failed to add Recipe, please try again in a few minutes')
        }else {
          seterror('Success adding new Recipe')
        }
      })
    }
    const test = () => {
      console.log(listMaterialInput)
    }
    const pushNewItem = () => {
      setlistMaterialInput([...listMaterialInput,{materialName:'', countMaterial:0}])
      console.log(listMaterialInput)
    }
    const changeMaterialName = (index,name) => {
      // 1. Make a shallow copy of the items
      let items = [...listMaterialInput];
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[index]};
      // 3. Replace the property you're intested in
      item.materialName = name;
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      setlistMaterialInput(items);  
      // setlistMaterial(listMaterial.filter((s) => s.material_name !== name))
      console.log(index)  
      console.log(listMaterialInput)  
      // setlistMaterialInput([...listMaterialInput,{materialName:'', countMaterial:0}])
      // console.log(listMaterialInput)
    }
    const changeMaterialCount = (index,count) => {
      // 1. Make a shallow copy of the items
      let items = [...listMaterialInput];
      // 2. Make a shallow copy of the item you want to mutate
      let item = {...items[index]};
      // 3. Replace the property you're intested in
      item.countMaterial = count;
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      items[index] = item;
      // 5. Set the state to our new copy
      setlistMaterialInput(items);  
      console.log(index)  
      console.log(listMaterialInput)            
      // setlistMaterialInput([...listMaterialInput,{materialName:'', countMaterial:0}])
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
  return(
    <>
      <Head>
      <title>Add New Recipe</title>
      <meta name="description" content="Dorayaki factory"/>
      </Head>
      <div className="min-h-[100vh] bg-mid_light_blue">
        <div className="flex h-[100vh] w-[100vw] bg-default bg-cover items-center text-center justify-center">
          <div className="flex flex-col w-100 h-[36rem] overflow-auto bg-dongker text-white py-6 px-8 rounded-xl">
            <span className="mx-auto font-title text-4xl mb-10">Add New Recipe</span>
            <input type="text" placeholder="Recipe Name" value={namaRecipe} onChange ={(e) => setnamaRecipe(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <input type="text" placeholder="Recipe Description" value={deskripsiRecipe} onChange ={(e) => setdeskripsiRecipe(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
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
            <button onClick={test} className="ml-auto my-2 bg-blue_button hover:bg-blue-600 duration-200 rounded-lg text-white text-lg px-2 h-10 w-32 right-0">Add Recipe</button>
          </div>
        </div>

      </div>
    </>
  )
}


export default RecipeAdd;