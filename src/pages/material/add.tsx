import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';

const MaterialAdd: NextPage = () => {
  // const router = useRouter()
  const [namaMaterial, setnamaMaterial] = useState('');
  const [error, seterror] = useState('');
  const [stokMaterial, setstokMaterial] = useState('');
    const onsubmit = async (e) => {
      e.preventDefault()
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
      <title>Add New Material</title>
      <meta name="description" content="Dorayaki factory"/>
      </Head>
      <div className="min-h-[100vh] bg-mid_light_blue">
        <div className="flex h-[100vh] w-[100vw] bg-default bg-cover items-center text-center justify-center">
          <div className="flex flex-col w-96 h-[fit-content] bg-dongker text-white py-6 px-8 rounded-xl">
            <span className="mx-auto font-title text-4xl mb-10">Add New Material</span>
            <input type="text" placeholder="Nama Bahan Baku" value={namaMaterial} onChange ={(e) => setnamaMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <input type="number" placeholder="Stok Bahan Baku" value={stokMaterial} onChange ={(e) => setstokMaterial(e.target.value)} className=" px-2 py-1 rounded-md my-2 text-black" />
            <span className="mx-auto font-title text-md mb-5 text-light_blue">{error}</span>
            <button onClick={onsubmit} className="ml-auto my-2 bg-blue_button hover:bg-blue-600 duration-200 rounded-lg text-white text-lg px-2 h-10 w-32 right-0">Add Material</button>
          </div>
        </div>

      </div>
    </>
  )
}


export default MaterialAdd;