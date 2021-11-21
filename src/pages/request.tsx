import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/navbar'
import Table from '../components/table'

const Daftar: NextPage = () => {
  return (
    <>
      <Head>
        <title>Daftar Request</title>
        <meta name="description" content="Dorayaki factory" />
      </Head>
      <div className="flex flex-col lg:h-[100vh] bg-blue-300">
        <Navbar />      
        <div className="flex flex-col content-center mt-4">
          <span className="font-bold text-center text-4xl mt-10 font-title">Daftar Request</span>
          <span className="px-[16rem] text-2xl text-left font-title my-auto">Terdapat xx Request</span>

          <Table data={['aaaa', 'bbbb', 'ccc']} />
        </div>
      </div>
    </>
  )
}

export default Daftar