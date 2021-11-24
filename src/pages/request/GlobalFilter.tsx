import React from 'react';

export const GlobalFilter= ({ filter, setFilter }) => {
    return (
        <span>
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} className="appearance-none border-xl w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="SEARCH" />       
        </span>
    );
}