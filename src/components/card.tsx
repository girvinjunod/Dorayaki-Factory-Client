import Link from 'next/link'
import Image from 'next/image'

function Card(props) {
    return (
        <div className="bg-blue-900 max-w-sm rounded-xl overflow-hidden shadow-lg m-4 p-4 flex flex-col justify-center">
          <Image 
                src={props.img}
                height={300}
                width={300}
                alt={props.name}
                />
          <div className="px-6 py-4">
            <Link href={props.link} passHref><span className="text-white font-bold text-xl mb-2 flex justify-center">{props.name}</span></Link>
          </div>
        </div>






    );
}


export default Card