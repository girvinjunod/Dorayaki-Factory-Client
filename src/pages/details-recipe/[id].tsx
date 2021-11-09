import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticProps : GetStaticProps = async({params}) => {
    console.log("ambil data")
    console.log(params)
    let data = axios.get('http://localhost:4000/getDetails?id=1').then((res) => {
        console.log(res)
    }).catch( (err) => {
        console.log(err)
    })
    console.log(data)
    const details = {
        id: "hello"
    }
    return {
      props: {
        details
      }
    }
  }

export const getStaticPaths : GetStaticPaths = async() => {
    console.log("paths adalah")
    // axios.get('http://localhost:4000/getRecipeID').then(res =>{
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })
    const paths = [
        {
            params: {
                id: "1"
            }
        },
        {
            params:{
                id: "2"
            }
        }
        ]
    return {
      paths,
      fallback: false
    }
}

const Detail: NextPage = ( {details} : any ) => {
    const router = useRouter()
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
      }, [router])

    return (
        <p>{details.id}</p>
    )
}

export default Detail;

