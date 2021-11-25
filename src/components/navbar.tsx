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
                console.log(username)
            }
            else{
                router.push('/login')
            }
    })
    }, [router])

    return (
        <div className="bg-blue-900 text-white px-6 flex justify-around items-center w-full flex-initial">
            <nav className="lg:flex lg:items-center lg:justify-between flex-wrap bg-teal-500 p-6 w-full">
              <div className="flex flex-shrink-0 text-white justify-around align-center">
                <div className="flex mr-4">
                  <div className="w-12 h-12 bg-gear bg-cover" ></div>
                  <Link href="/" passHref><span className="ml-2 font-bold text-2xl cursor-pointer self-center">PisangJerukAnjing</span></Link>
                </div>
                <div className="block lg:hidden ml-4">
                  <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="w-full block flex-grow lg:flex lg:items-end lg:w-auto lg:justify-end">
                  <div className="text-sm flex flex-col items-end justify-end lg:flex-grow lg:flex-row lg:items-center">
                    <Link href="/request/list" passHref><span className="block mt-4 mx-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Request List</span></Link>
                    <Link href="/recipe/list" passHref><span className="block mt-4 mx-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Recipe Management</span></Link>
                    <Link href="/material/list" passHref><span className="block mt-4 mx-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Ingredient Management</span></Link>
                    <p className="block mt-4 mx-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mb-4 lg:mb-0 w-36 text-center">
                      Username: {username}
                    </p>
                    <button onClick={logout} className="mx-3 font-text cursor-pointer p-3 bg-blue-200 text-blue-900 rounded-lg px-10 
                        hover:bg-blue-700 hover:text-white duration-200">Logout</button>     
                  </div>
                </div>
              </div>
            </nav>      
        </div>
    )
}


export default Navbar