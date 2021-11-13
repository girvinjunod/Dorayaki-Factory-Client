import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Card from '../components/card'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dorayaki factory" />
      </Head>
      <div className="flex flex-col lg:h-[100vh] bg-blue-300">
        <Navbar />
        <div className=" flex flex-col">
          <p className="flex justify-center m-6">Dashboard</p>
          <div className="flex-grow flex m-auto items-stretch flex-col lg:flex-row lg:justify-around">
            <Card className="" name="Daftar Request" />
            <Card className="" name="Manajemen Resep" />
            <Card className="" name="Manajemen Bahan Baku" />
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Home
