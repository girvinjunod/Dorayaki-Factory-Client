import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Login: NextPage = () => {
    return (
        <>
        <Head>
        <title>Login</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="bg-blue-300 h-[100vh] flex justify-around items-center">
            <div className="">
                <Image 
                priority
                src="/images/login.png"
                className="rounded"
                height={400}
                width={400}
                alt="robot"
                />
            </div>

            <div className="w-[450px] rounded-2xl bg-blue-900">
                <h2 className="my-4 mt-6 text-center text-3xl text-white font-bold">Login</h2>
                <form action="" method="post" className="flex flex-col mx-6 my-5">
                    <input type="text" name="" id="" placeholder="Username" className="my-4 p-2 rounded"/>
                    <input type="text" name="" id="" placeholder="Password" className="my-4 p-2 rounded"/>
                    <button className="mt-6 mb-4 bg-blue-400 text-white rounded-lg py-2 px-8 ml-auto hover:bg-blue-600 duration-200">Login</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;