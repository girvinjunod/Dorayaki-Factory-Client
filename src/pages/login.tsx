import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect } from 'react'
import Link from 'next/link'

const Login: NextPage = () => {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect( () => {
        axios.get('http://localhost:4000/auth',{ withCredentials: true }).then(res => {
              console.log(res.data);
              if (res.data.auth){
                  console.log("auth")
                  router.push('/')
              }
              else{
                  console.log("not logged in")
              }
      })
      }, [])

    const reset = () => {
        setError(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        let obj = {uname: uname, password: password}
        console.log(obj)
        await axios.post('http://localhost:4000/login', obj,{ withCredentials: true }).then(res => {
            if (res.data.auth){
                console.log("ini login trus redirect")
                router.push('/')
            }
            else{
                console.log("display error message")
                setError(true)
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
                    <input type="text" name="uname" value={uname} placeholder="Username" 
                    className="my-4 p-2 rounded" onChange ={(e) => setUname(e.target.value)} onBlur= {reset}/>
                    <input type="password" name="password" value={password} placeholder="Password"
                     className="my-4 p-2 rounded" onChange ={(e) => setPassword(e.target.value)} onBlur= {reset}/>
                    {error ? <p className="text-red-600 font-bold">Login failed, please fill the fields correctly.</p>: ""}
                    <p className="text-white">Don't have an account? <Link href="/register"><span className="text-yellow-400 cursor-pointer">Register here.</span></Link></p>
                    <button className='mt-6 mb-4 bg-blue-400 text-white rounded-lg py-2 px-8 ml-auto hover:bg-blue-600 duration-200' onClick={onSubmit}>Login</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;