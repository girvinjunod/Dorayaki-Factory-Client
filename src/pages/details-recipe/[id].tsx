import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import {useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'

const Detail: NextPage = ( ) => {
    const [idState, setIDState] = useState(0)
    const [recipename, setRecipeName] = useState("")
    const [recipedesc, setRecipeDesc] = useState("")
    const [recipematerial, setRecipeMaterial] = useState([])

    const router = useRouter()
    const { id } = router.query
    useEffect( () => {
        axios.get('http://localhost:4000/auth',{ withCredentials: true }).then(res => {
              console.log(res.data);
              if (res.data.auth){
                  console.log("auth")
                  
              }
              else{
                  console.log("not logged in")
                //   router.push('/')
              }
        })
        if (id != undefined){
            axios.get('http://localhost:4000/getDetails?id=' + id).then(res => {
                let data = res.data
                let valid = data.auth
                console.log(res.data)
                if (valid){
                    setRecipeName(data.name)
                    setRecipeDesc(data.desc)
                    setRecipeMaterial(data.material)
                    setIDState(1)
                }else{
                    setIDState(2)
                }
            }).catch((err) => {
                console.log(err)
            })
        }

      }, [router, id])

    

    return (
        <>
        <Head>
        <title>Detail {recipename}</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        
        {idState == 0 ? 
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center"></div> 
        : idState==1 ? 
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center">
        <h1 className="text-6xl font-bold m-10">Recipe Detail</h1>
        <div className="w-full px-32">
        <h2 className="text-4xl font-bold mb-8">{recipename} Recipe</h2>
        <p className="text-lg mb-6">{recipedesc}</p>
        <h3 className="text-2xl font-bold">Ingredients</h3>
        <ol className="list-decimal list-inside">
            {recipematerial.map(({ id, mat }) => (
                <li key={id}>{mat}</li>
            ))}
        </ol>
        </div>
        </div>
        :
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center justify-center">
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
        <h1 className="text-4xl font-bold">No recipe found :(</h1>
        </div>
        </div>
         }
        </>
    )
}

export default Detail;

