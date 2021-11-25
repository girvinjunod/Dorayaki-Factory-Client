import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { COLUMNS } from './columns'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar'
import Head from 'next/head'
import { GlobalFilter } from './GlobalFilter';

const Request: NextPage = () => {

    const router = useRouter()
    const [listRequest, setlistRequest] = useState([]);
    const columns = useMemo(() => COLUMNS, []);
    const [requestAccepted, setrequestAccepted] = useState('');
    const [requestDeclined, setrequestDeclined] = useState('');

    const tableInstance = useTable({
        columns,
        data : listRequest
    },
    useGlobalFilter,
    useSortBy
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = tableInstance

    const { globalFilter } = state

    function requestAccept(id) {
      console.log("request accepted")
      axios.post('http://localhost:4000/acceptRequest/'+id).then(res => {
        // seterror(res.data.err)
        if (res.data.err == "Amount not sufficient") {
            alert("Amount not sufficient")
        }
        setrequestAccepted(id)
      })
    }
    
    function requestDecline(id) {
      console.log("request declined")
      axios.post('http://localhost:4000/declineRequest/'+id).then(res => {
        console.log("request id set")
        setrequestDeclined(id)
      })
    }

    useEffect ( () => {
        axios.get('http://localhost:4000/getAllRequest').then(res => {
          console.log(res)
          setlistRequest(res.data.part)
          console.log(listRequest)
        })
    
      }, [router, requestAccepted, requestDeclined])

    return (
        <div>
            <Head>
                <title>Request List</title>
                <meta name="description" content="Dorayaki factory"/>
            </Head>
            <div className="flex flex-col h-[100vh]">
                <Navbar />



                <div className="flex flex-col items-center h-[100vh] bg-blue-300 flex-auto">
                    <span className=" font-bold text-4xl mt-10 font-title">Request List</span>
                    <div className="flex flex-row justify-between w-full px-[16rem] items-center mt-5">
                    <span className="text-2xl text-left font-title my-auto">Terdapat {listRequest.length} Material</span>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>

                    <table className="mt-10 text-lg font-text" {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr className="border-2 border-dongker" {...headerGroup.getHeaderGroupProps() }>
                                    {headerGroup.headers.map((column) => (
                                        <th className=" px-8 py-3 border-2 border-dongker" {...column.getHeaderProps(column.getSortByToggleProps())}> 
                                          {column.render('Header')}
                                          <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}
                                          </span>
                                        </th>
                                        ))}
                                    <th className="px-8 py-3 border-2 border-dongker">Action</th>
                                </tr>
                            ))}
                            
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td className="px-4 text-center border-2 border-dongker break-words" {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                        })}

                                        <td className="text-center border-2 border-dongker flex flex-col">
                                          <div className="">
                                            {row.values.status_request == "WAITING" ? 
                                                <button onClick={ () => requestDecline(row.values.id_request)} className="bg-red-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                                                  DECLINE
                                                </button>
                                              : 
                                              <button className="bg-red-900 text-white m-2 p-2 px-4 my-1 rounded-lg">
                                                DECLINE
                                              </button>
                                            }

                                            {row.values.status_request == "WAITING" ? 
                                                <button onClick={ () => requestAccept(row.values.id_request)} className="bg-blue-500 text-white m-2 p-2 px-4 my-1 rounded-lg">
                                                  ACCEPT
                                                </button>
                                              : 
                                              <button className="bg-blue-900 text-white m-2 p-2 px-4 my-1 rounded-lg">
                                                ACCEPT
                                              </button>
                                            }
                                          </div>
                                        </td>
















                                    </tr>
                                )
                            })} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Request