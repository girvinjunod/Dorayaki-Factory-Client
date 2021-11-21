import Link from 'next/link'
import Image from 'next/image'

function Table(props) {
    return (
        <div className="w-full xl:w-1/2 mb-12 xl:mb-0 px-4 mx-auto mt-20">
          <div className="relative flex flex-col bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 border py-3 text-xs border-l-0 border-r-0 text-left">
                      #
                    </th>
                    <th className="px-6 border py-3 text-xs border-l-0 border-r-0 text-left">
                      NAME
                    </th>
                    <th className="px-6 border py-3 text-xs border-l-0 border-r-0 text-left">
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody>
                  
                    {props.data.map(function(name, index){
                      return (
                        <tr key={index}>
                          <td className="border-t-0 px-6 border-l-0 border-r-0 text-xs p-4">
                            {index + 1}
                          </td>
                          <td className="border-t-0 px-6 border-l-0 border-r-0 text-xs p-4">
                            {name}
                          </td>
                          <td className="border-t-0 px-6 border-l-0 border-r-0 text-xs p-4">
                            <a href="#" className="bg-red-500 hover:bg-red-700 text-white text-center py-2 px-4 rounded mr-3">
                              DELETE
                            </a>
                            <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded mr-3">
                              EDIT
                            </a> 
                          </td>
                        </tr>
                      );
                    })}
                    
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
}


export default Table