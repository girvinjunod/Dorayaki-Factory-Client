import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../../../components/navbar'
import Image from 'next/image'

const MaterialEdit: NextPage = () => {
  // const router = useRouter()
  const [idState, setIDState] = useState(1)
  const [namaMaterial, setnamaMaterial] = useState('');
  const [error, seterror] = useState('');
  const [stokMaterial, setstokMaterial] = useState('');
  const router = useRouter();
  const { id } = router.query

  useEffect( () => {
    if (id != undefined){
        axios.get('http://localhost:4000/editMaterial/' + id).then(res => {
            let data = res.data
            let valid = data.auth
            console.log(res.data)
            if (valid){
                setnamaMaterial(data.name)
                setstokMaterial(data.stock)
                setIDState(1)
            } else{
              setIDState(0)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

  }, [id])

  const onsubmit = async (e) => {
    e.preventDefault()
    if (namaMaterial == ''){
      seterror('Please Input the material name')
      return
    }
    if (+stokMaterial < 0){
      seterror('Please Input the right amount (stok >= 0)')
      return
    }
    let obj = {namaMaterial: namaMaterial, stokMaterial: stokMaterial, stokId : id}
    await axios.post('http://localhost:4000/editMaterial',obj).then(res => {
      if (res.data.err){
        seterror('Failed to edit material, please try again in a few minutes')
      }else {
        seterror('Success edit new material')
      }
    })
  }

  return(
    <>
      <Head>
      <title>Edit Material</title>
      <meta name="description" content="Dorayaki factory"/>
      </Head>
      <div className="flex flex-col h-[100vh]">
      <Navbar />
        {idState == 1 ?
        <div className="flex h-[100vh] w-[100vw] bg-blue-300 flex-auto items-center text-center justify-center">
        <div className="flex flex-col w-96 h-[fit-content] bg-dongker text-white py-6 px-8 rounded-xl">
        <span className="mx-auto font-title text-4xl mb-10">Edit Material</span>
        <input type="text" disabled placeholder="Nama Bahan Baku" value={namaMaterial} onChange ={(e) => setnamaMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black bg-gray-100" />
        <input min={0} type="number" placeholder="Stok Bahan Baku" value={stokMaterial} onChange ={(e) => setstokMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black bg-gray-100" />
        <span className="mx-auto font-title text-md mb-5 text-light_blue">{error}</span>
        <button onClick={onsubmit} className="ml-auto my-2 bg-blue_button hover:bg-blue-600 duration-200 rounded-lg text-white text-lg px-2 h-10 w-32 right-0">Edit Material</button>
        </div>
        </div>
         : 
         <div className="bg-blue-300 h-[100vh] flex flex-col items-center justify-center flex-auto">
         <div className="flex flex-col items-center">
             <div className ="mb-10">
                 <Image 
                 priority
                 src="/images/no_recipe.png"
                 className="rounded"
                 height={300}
                 width={300}
                 alt="error"
                 />
             </div>
         <h1 className="text-3xl font-bold">No material found :(</h1>
         </div>
         </div>
         }
        </div>
    </>
  )
}


export default MaterialEdit;