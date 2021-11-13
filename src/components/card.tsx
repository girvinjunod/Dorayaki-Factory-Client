import Link from 'next/link'

function Card(props) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 p-4">
          <img className="w-full" src="/img/card-top.jpg" alt={props.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{props.name}</div>
          </div>
        </div>






    );
}


export default Card