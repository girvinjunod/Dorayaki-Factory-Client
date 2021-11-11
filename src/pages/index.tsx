import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dorayaki factory" />
      </Head>
      <div className="flex flex-col h-[100vh]">
        <Navbar />
        <div className="bg-blue-300 flex flex-col items-center justify-center flex-auto">
        <p>Dashboard</p>
        
        
        </div>
      </div>
    </>
  )
}

export default Home
