import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import {useState} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/navbar'

const Detail: NextPage = ( ) => {
    const [idState, setIDState] = useState(0)
    const [recipename, setRecipeName] = useState("")
    const [recipedesc, setRecipeDesc] = useState("")
    const [recipematerial, setRecipeMaterial] = useState([])
    const router = useRouter()
    const { id } = router.query
    useEffect( () => {
        if (id != undefined){
            axios.get('http://localhost:4000/getDetails/' + id).then(res => {
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

      }, [id])

    

    return (
        <>
        <div className="flex flex-col h-[100vh]">
        <Navbar />
        {/* Loading */}
        {idState == 0 ?
        <>
        <Head>
        <title>Loading...</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center flex-auto"></div></>
        : idState==1 ?
        // Detail loaded
        <>
        <Head>
        <title>Detail {recipename}</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        

        <div className="bg-blue-300 h-[100vh] flex flex-col items-center flex-auto">
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
        </div></>
        :
        // No recipe found
        <>
        <Head>
        <title>No Recipe Found</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="bg-blue-300 h-[100vh] flex flex-col items-center justify-center flex-auto">
        <div className="flex flex-col items-center">
            <div className ="mb-10">
                <Image 
                priority
                src="/images/no_recipe.png"
                className="rounded"
                height={300}
                width={300}
                alt="error"
                />
            </div>
        <h1 className="text-3xl font-bold">No recipe found :(</h1>
        </div>
        </div></>
         }
         </div>
        </>
    )
}

export default Detail;

