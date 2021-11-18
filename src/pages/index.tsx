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
        <div className="flex flex-col content-center mt-4">
          <div className="flex-grow flex m-auto items-stretch flex-col lg:flex-row lg:justify-around">
            <Card link="/daftar-request" img="/images/request.svg" name="DAFTAR REQUEST" />
            <Card link="/manajemen-resep" img="/images/resep.svg" name="MANAJEMEN RESEP" />
            <Card link="/manajemen-bahan" img="/images/bahan_baku.svg" name="MANAJEMEN BAHAN BAKU" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
