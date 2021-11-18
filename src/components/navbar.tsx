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
            <nav className="lg:flex lg:items-center lg:justify-between flex-wrap bg-teal-500 p-6">
              <div className="flex flex-shrink-0 text-white justify-around align-center">
                <div className="flex mr-4">
                  <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                  <Link href="/" passHref><span className="font-bold text-xl cursor-pointer">PisangJerukAnjing</span></Link>
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
                    <Link href="/request"><span className="block mt-4 lg:mr-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Request List</span></Link>
                    <Link href="/recipe/list"><span className="block mt-4 lg:mr-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Recipe Management</span></Link>
                    <Link href="/material/list"><span className="block mt-4 lg:mr-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">Ingredient Management</span></Link>
                    <a href="#responsive-header" className="block mt-4 lg:mr-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mb-4 lg:mb-0">
                      Username: {username}
                    </a>
                    <button onClick={logout} className="cursor-pointer p-3 bg-blue-200 text-blue-900 rounded-lg px-10 
                        hover:bg-blue-700 hover:text-white duration-200">Logout</button>     
                  </div>
                </div>
              </div>
            </nav>      
        </div>
    )
}


export default Navbar