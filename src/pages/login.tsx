import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookieCutter from 'cookie-cutter'

const Login: NextPage = () => {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        let obj = {uname: uname, password: password}
        console.log(obj)
        await axios.post('http://localhost:4000/login', obj).then(res => {
            console.log(res.data);
            if (res.data.auth){
                console.log("ini login trus redirect")
                // router.push('/')
                cookieCutter.set('token', res.data.token)
                // Delete a cookie
                // cookieCutter.set('myCookieName', '', { expires: new Date(0) })
            }
            else{
                console.log("display error message")
            }
        })
    }



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

                <form  onSubmit = {onSubmit} className="flex flex-col mx-6 my-5">
                    <input type="text" value={uname} placeholder="Username" 
                    className="my-4 p-2 rounded" onChange ={(e) => setUname(e.target.value)}/>
                    <input type="password" value={password} placeholder="Password"
                     className="my-4 p-2 rounded" onChange ={(e) => setPassword(e.target.value)}/>
                    {/* <input type='submit' className='mt-6 mb-4 bg-blue-400 text-white rounded-lg py-2 px-8 ml-auto hover:bg-blue-600 duration-200' value='Login'/> */}
                    <button className='mt-6 mb-4 bg-blue-400 text-white rounded-lg py-2 px-8 ml-auto hover:bg-blue-600 duration-200' onClick={onSubmit}>Login</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;