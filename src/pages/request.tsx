import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Navbar from '../components/navbar'


const Request: NextPage = () => {
  const router = useRouter()
  const [listRequest, setlistRequest] = useState([]);

  useEffect ( () => {
    axios.get('http://localhost:4000/getAllRequest').then(res => {
      console.log(res)
      setlistRequest(res.data.part)
      console.log(listRequest)
    })
  }, [router])
  return(
    <>
        <Head>
        <title>Request List</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="flex flex-col h-[100vh]">
        <Navbar />
        <div className="flex flex-col items-center h-[100vh] bg-blue-300 flex-auto">
          <span className=" font-bold text-4xl mt-10 font-title">Request List</span>
          <div className="flex flex-row justify-between w-full px-[16rem] items-center mt-5">
          <span className="text-2xl text-left font-title my-auto">Terdapat {listRequest.length} Material</span>
          <Link href="/material/add">
            <a>
              <button className="bg-blue_button rounded-lg text-white text-lg px-2 h-12">Add Material</button>
            </a>
          </Link>

          </div>
          <table className="mt-10 text-lg font-text">
          <tr className="border-2 border-dongker">
            <th className="px-8 py-3 border-2 border-dongker">Id</th>
            <th className="w-[46rem] px-8 py-3 border-2 border-dongker">Recipe Name</th>
            <th className=" px-8 py-3 border-2 border-dongker">Count Request</th>
            <th className=" px-8 py-3 border-2 border-dongker">IP Store</th>
            <th className="px-8 py-3 border-2 border-dongker">Action</th>
          </tr>
          {listRequest.map(item => (
          <tr key={item.id_request}>
            <td className="text-center border-2 border-dongker">{item.id_request}</td>
            <td className="px-4 text-left border-2 border-dongker break-words">{item.recipe_name}</td>
            <td className="px-4 text-center border-2 border-dongker break-words">{item.count_request}</td>
            <td className="px-4 text-left border-2 border-dongker break-words">{item.ip_store}</td>
            <td className="text-center border-2 border-dongker">
              <a  href={"/material/edit/"+item.id_request}>
                <button className="bg-red-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                  DECLINE
                </button>
              </a>
              <a  href={"/material/edit/"+item.id_request}>
                <button className="bg-blue-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                  ACCEPT
                </button>
              </a>
              </td>
          </tr>
          ))}         

          </table>
        </div>
        </div>
    </>
  );
}

export default Request