import Head from 'next/head'
import type { NextPage } from 'next'
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar'

const MaterialAdd: NextPage = () => {
  // const router = useRouter()
  const [namaMaterial, setnamaMaterial] = useState('');
  const [error, seterror] = useState('');
  const [stokMaterial, setstokMaterial] = useState('');
    const onsubmit = async (e) => {
      e.preventDefault()
      if (namaMaterial == ''){
        seterror('Please Input the material name')
        return
      }
      if (+stokMaterial <= 0){
        seterror('Please Input the right amount (stok > 0)')
        return
      }
      let obj = {namaMaterial: namaMaterial, stokMaterial: stokMaterial}
      await axios.post('http://localhost:4000/addMaterial',obj).then(res => {
        if (res.data.err){
          seterror('Failed to add material, please try again in a few minutes')
        }else {
          setnamaMaterial('')
          setstokMaterial('')
          seterror('Success adding new material')
        }
      })
    }
  return(
    <>
      <Head>
      <title>Add New Ingredient</title>
      <meta name="description" content="Dorayaki factory"/>
      </Head>
      <div className="flex flex-col h-[100vh]">
      <Navbar />
        <div className="flex h-[100vh] w-[100vw] bg-blue-300 flex-auto items-center text-center justify-center">
          <div className="flex flex-col h-[fit-content] bg-dongker text-white py-6 px-8 rounded-xl">
            <span className="mx-auto font-title text-4xl mb-10">Add New Ingredient</span>
            <input type="text" placeholder="Ingredient Name" value={namaMaterial} onChange ={(e) => setnamaMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <input min={1} type="number" placeholder="Ingredient Initial Stock" value={stokMaterial} onChange ={(e) => setstokMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <span className="mx-auto font-title text-md mb-5 text-light_blue">{error}</span>
            <button onClick={onsubmit} className="ml-auto my-2 bg-blue_button hover:bg-blue-600 duration-200 rounded-lg text-white text-lg px-2 h-10 right-0">Add Ingredient</button>
          </div>
        </div>

      </div>
    </>
  )
}


export default MaterialAdd;