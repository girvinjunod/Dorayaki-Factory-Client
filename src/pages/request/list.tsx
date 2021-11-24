import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Navbar from '../../components/navbar'


const Request: NextPage = () => {
  const router = useRouter()
  const [listRequest, setlistRequest] = useState([]);
  const [error, seterror] = useState('');
  const [requestAccepted, setrequestAccepted] = useState('');
  const [requestDeclined, setrequestDeclined] = useState('');
  

  function requestAccept(id) {
    console.log("request accepted")
    axios.post('http://localhost:4000/acceptRequest/'+id).then(res => {
      seterror(res.data.err)
      setrequestAccepted(id)
    })
  }

  function requestDecline(id) {
    console.log("request declined")
    axios.post('http://localhost:4000/declineRequest/'+id).then(res => {
      console.log("request id set")
      setrequestDeclined(id)
    })
  }

  useEffect ( () => {
    axios.get('http://localhost:4000/getAllRequest').then(res => {
      console.log(res)
      setlistRequest(res.data.part)
      console.log(listRequest)
    })

  }, [router, requestAccepted, requestDeclined])
  
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
          </div>
          <table className="mt-10 text-lg font-text">
          <tr className="border-2 border-dongker">
            <th className="px-8 py-3 border-2 border-dongker">ID</th>
            <th className="w-[30rem] px-8 py-3 border-2 border-dongker">Recipe Name</th>
            <th className=" px-8 py-3 border-2 border-dongker">Count Request</th>
            <th className=" px-8 py-3 border-2 border-dongker">IP Store</th>
            <th className=" px-8 py-3 border-2 border-dongker">Status</th>
            <th className="px-8 py-3 border-2 border-dongker">Action</th>
          </tr>
          {listRequest.map(item => (
          <tr key={item.id_request}>
            <td className="text-center border-2 border-dongker">{item.id_request}</td>
            <td className="px-4 text-center border-2 border-dongker break-words">{item.recipe_name}</td>
            <td className="px-4 text-center border-2 border-dongker break-words">{item.count_request}</td>
            <td className="px-4 text-center border-2 border-dongker break-words">{item.ip_store}</td>
            <td className="px-4 text-center border-2 border-dongker break-words">{item.status_request}</td>
            <td className="text-center border-2 border-dongker flex flex-col">
              <div className="">
                {item.status_request == "WAITING" ? 
                    <button onClick={ () => requestDecline(item.id_request)} className="bg-red-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                      DECLINE
                    </button>
                  : 
                  <button className="bg-red-900 text-white m-2 p-2 px-4 my-1 rounded-lg">
                    DECLINE
                  </button>
                }

                {item.status_request == "WAITING" ? 

                    <button onClick={ () => requestAccept(item.id_request)} className="bg-blue-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                      ACCEPT
                    </button>
  
                  : 
                  <button className="bg-blue-900 text-white m-2 p-2 px-4 my-1 rounded-lg">
                    ACCEPT
                  </button>

                }
              </div>
              <span className="mx-auto font-title text-md text-red-600">{error}</span>
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