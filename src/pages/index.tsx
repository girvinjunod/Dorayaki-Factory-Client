import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
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
  }, [])


  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dorayaki factory" />
      </Head>

      <div className="font-bold rounded text-center">
      Dashboard
      </div>
      </div>
  )
}

export default Home
