import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import { useEffect } from 'react';
import axios from 'axios';

const Comment: NextPage = () => {
  const router = useRouter()
  useEffect( () => {
    axios.get('http://localhost:4000/auth',{ withCredentials: true }).then(res => {
          console.log(res.data);
          if (res.data.auth){
              console.log("auth")
          }
          else{
              router.push('/login')
          }
  })
  }, [router])

  return (
        <>
        <Head>
        <title>Error 404</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
            <div className ="mb-10">
                <Image 
                priority
                src="/images/error.png"
                className="rounded"
                height={300}
                width={300}
                alt="error"
                />
            </div>
        <h1 className="text-4xl font-bold">Page Not Found :(</h1>
        </div>
        </div>
        </>
  )
}

export default Comment