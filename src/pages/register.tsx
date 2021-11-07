import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import Link from 'next/link'

const Register: NextPage = () => {
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter()
    const [errEmail, setErrEmail] = useState(false)
    const [errUname, setErrUname] = useState(false)
    const [errPass, setErrPass] = useState(false)
    const [errConf, setErrConf] = useState(false)
    const [error, setError] = useState(false)

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



    const onSubmit = async (e) => {
        e.preventDefault()
        let valid = true
        if (errEmail || errUname || errPass || errConf){
            valid = false
        }

        if (valid){
            let obj = {email: email, uname: uname, password: password, conf:confirmPassword}
            console.log(obj)
            await axios.post('http://localhost:4000/register', obj,{ withCredentials: true }).then(res => {
                console.log(res)
                console.log(res.data);
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
        else{
            setError(true)
        }
    }

    const valUname = async () => {
        await axios.get('http://localhost:4000/valuname?username='+uname).then(res => {
            console.log(res.data);
            if (res.data.auth){
                setErrUname(false)
            }
            else{
                setErrUname(true)
            }
        })
    }

    const valEmail = async () => {
        let valid = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);
        console.log(valid)
        if (!valid){
            setErrEmail(true)
        }
        else{
            setErrEmail(false)
        }
        setError(false)
    }

    const valPassword = async () => {
        if (password.length < 6){
            setErrPass(true)
        }
        else{
            setErrPass(false)
        }
    }

    const valConfirmPassword = async () => {
        if (password == confirmPassword){
            setErrConf(false)
        }
        else{
            setErrConf(true)
        }
    }
    


    return (
        <>
        <Head>
        <title>Register</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="bg-blue-300 h-[100vh] flex justify-around items-center">
            <div className="">
                <Image 
                priority
                src="/images/register.png"
                className="rounded"
                height={400}
                width={400}
                alt="tangan robot"
                />
            </div>

            <div className="w-[450px] rounded-2xl bg-blue-900">
                <h2 className="my-4 mt-6 text-center text-3xl text-white font-bold">Register</h2>

                <form  onSubmit = {onSubmit} className="flex flex-col mx-6 my-5">
                    <input type="text" name="email" value={email} placeholder="Email" 
                    className="my-4 p-2 rounded" onChange ={(e) => setEmail(e.target.value)} onBlur={() => valEmail()}/>
                    {errEmail ? <label htmlFor="email" className="text-red-600">Please enter a valid email.</label>: ""}
                    <input type="text" name="uname" value={uname} placeholder="Username" 
                    className="my-4 p-2 rounded" onChange ={(e) => setUname(e.target.value)} onBlur={() => valUname()}/>
                    {errUname ?<label htmlFor="uname" className="text-red-600">Please enter a unique username</label>:""}
                    <input type="password" name="password" value={password} placeholder="Password"
                     className="my-4 p-2 rounded" onChange ={(e) => setPassword(e.target.value)} onBlur={() => valPassword()}/>
                    {errPass ? <label htmlFor="password" className="text-red-600">Your password needs to have a minimum of 6 characters.</label> : ""}
                    <input type="password" name="confirmpassword" value={confirmPassword} placeholder="Confirm Password"
                     className="my-4 p-2 rounded" onChange ={(e) => setConfirmPassword(e.target.value)} onKeyUp={() => valConfirmPassword()}/>
                    {errConf ? <label htmlFor="confirmpassword" className="text-red-600">Those passwords didn't match, try again.</label> : ""}
                    {error ? <p className="text-red-600 font-bold">Register failed, please fill the fields correctly.</p>: ""}
                    <p className="text-white">Already have an account? <Link href="/login"><span className="text-yellow-400 cursor-pointer">Login here.</span></Link></p>
                    <button className='mt-6 mb-4 bg-blue-400 text-white rounded-lg py-2 px-8 ml-auto hover:bg-blue-600 duration-200' onClick={onSubmit}>Login</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Register;