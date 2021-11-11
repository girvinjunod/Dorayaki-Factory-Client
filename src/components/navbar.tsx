import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'

const Navbar = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")

    const logout = () => {
        axios.get('http://localhost:4000/logout', { withCredentials: true }).then(res => {
            console.log("res", res)
            router.push('/login')
        }).catch(err => {
            console.log("err", err)
        })
    }

    useEffect( () => {
      axios.get('http://localhost:4000/auth',{ withCredentials: true }).then(res => {
            console.log(res.data);
            if (res.data.auth){
                console.log("auth")
                setUsername(res.data.username)
            }
            else{
                router.push('/login')
            }
    })
    }, [router])

    return (
        <div className="bg-blue-900 text-white p-6 flex justify-around items-center w-full flex-initial">
            <Link href="/" passHref><span className="font-bold text-xl cursor-pointer">PisangJerukAnjing</span></Link>
            <p>Ini navbar</p>
            <p>Username: {username}</p>
            <button onClick={logout} className="cursor-pointer p-3 bg-blue-200 text-blue-900 rounded-lg px-10 
             hover:bg-blue-700 hover:text-white duration-200">Logout</button>
        </div>
    )
}


export default Navbar