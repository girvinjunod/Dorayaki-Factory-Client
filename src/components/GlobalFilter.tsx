const GlobalFilter= ({ filter, setFilter }) => {
    const handleFilter = (e) => {
      console.log("ketik")
      setFilter(e.target.value)
    }
    return (
        <span>
            <input value={filter || ''} onChange={(e) => handleFilter(e)} className="appearance-none border-xl w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="SEARCH" />       
        </span>
    );
  }

export default GlobalFilter