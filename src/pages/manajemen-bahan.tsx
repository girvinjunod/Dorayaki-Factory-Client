import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Table from '../components/table'

const Bahan: NextPage = () => {

  return (
    <>
      <Head>
        <title>Manajemen Bahan Baku</title>
        <meta name="description" content="Dorayaki factory" />
      </Head>
      <div className="flex flex-col lg:h-[100vh] bg-blue-300">
        <Navbar />
        <div className="flex flex-col content-center mt-4">
          <h1 className="text-center text-xl font-bold"> Manajemen Bahan Baku </h1>
          <div className="flex justify-around mt-5">
            <h3 className="text-center text-md">
              Terdapat xx Bahan Baku
            </h3>
            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded mr-3">
              TAMBAH BAHAN
            </a>
          </div>
          <Table data={['aaaa', 'bbbb', 'ccc']} />
        </div>
      </div>
    </>
  )
}

export default Bahan