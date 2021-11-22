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
        <div className="flex flex-col content-center mt-24">
          <div className="flex-grow flex m-auto items-stretch flex-col lg:flex-row lg:justify-around">
            <Card link="/request" img="/images/request.svg" name="Request List" />
            <Card link="/recipe/list" img="/images/resep.svg" name="Recipe Management" />
            <Card link="/material/list" img="/images/bahan_baku.svg" name="Ingredient Management" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
