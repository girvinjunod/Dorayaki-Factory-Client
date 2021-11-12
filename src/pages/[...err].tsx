import Head from 'next/head'
import Image from 'next/image'
import type { NextPage } from 'next'
import Navbar from '../components/navbar'

const Comment: NextPage = () => {
  return (
        <>
        <Head>
        <title>Error 404</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="flex flex-col h-[100vh]">
            <Navbar />
            <div className="bg-blue-300 flex flex-col items-center justify-center flex-auto">
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
        </div>
        </>
  )
}

export default Comment