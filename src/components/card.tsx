import Link from 'next/link'
import Image from 'next/image'

function Card(props) {
    return (
      <Link href={props.link} passHref>
        <div className="bg-blue-900 max-w-sm rounded-xl overflow-hidden shadow-lg m-8 p-4 flex flex-col justify-center cursor-pointer">
          <Image 
                src={props.img}
                height={250}
                width={250}
                alt={props.name}
                />
          <div className="px-6 py-4 w-48 mx-auto text-center">
            <span className="text-white font-bold text-xl mb-2 flex justify-center">{props.name}</span>
          </div>
        </div>
      </Link>






    );
}


export default Card