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
          <h1 className="text-center text-xl font-bold"> DAFTAR REQUEST </h1>
          <h3 className="text-center text-md">
            Terdapat xx Request
          </h3>
          <Table data={['aaaa', 'bbbb', 'ccc']} />
        </div>
      </div>
    </>
  )
}

export default Daftar