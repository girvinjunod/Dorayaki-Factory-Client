import Head from 'next/head'
import type { NextPage } from 'next'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Recipe: NextPage = () => {
  const router = useRouter()
  const [listRecipe, setlistRecipe] = useState([]);

  useEffect ( () => {
    axios.get('http://localhost:4000/getAllRecipe').then(res => {
      console.log(res)
      setlistRecipe(res.data.part)
      console.log(listRecipe)
    })
  }, [router])
  return(
    <>
        <Head>
        <title>Recipe List</title>
        <meta name="description" content="Dorayaki factory"/>
        </Head>
        <div className="flex flex-col items-center min-h-[100vh] bg-mid_light_blue">
          <span className=" font-bold text-4xl mt-10 font-title">Recipe List</span>
          <div className="flex flex-row justify-between w-full px-[16rem] items-center mt-5">
          <span className="text-2xl text-left font-title my-auto">Terdapat {listRecipe.length} Resep</span>
          <button className="bg-blue_button rounded-lg text-white text-lg px-2 h-12">Add Recipe</button>
          </div>
          <table className="mt-10 text-lg font-text">
          <tr className="border-2 border-dongker">
            <th className="px-8 py-3 border-2 border-dongker">Id</th>
            <th className="w-[46rem] px-8 py-3 border-2 border-dongker">Recipe Name</th>
            <th className="px-8 py-3 border-2 border-dongker">Action</th>
          </tr>
          {listRecipe.map(item => (
          <tr key={item.id_recipe}>
            <td className="text-center border-2 border-dongker">{item.id_recipe}</td>
            <td className="px-4 text-left border-2 border-dongker break-words">{item.recipe_name}</td>
            <td className="text-center border-2 border-dongker">
              <a href={"editRecipe/"+item.id_recipe}>
                <button className="bg-blue_button text-white p-2 px-4 my-1 rounded-lg">
                  Edit
                </button>
              </a>
              </td>
          </tr>
          ))}         

          </table>
        </div>
        {/* <h1>{listRecipe}</h1> */}

    </>
  );
}

export default Recipe;