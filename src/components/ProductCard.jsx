export default function ProductCard({data}) {

    return (
        <div className="card no-scrollbar bg-white flex flex-col gap-5 p-3 w-80 h-150 max-h-200 overflow-scroll border-2 shadow-md shadow-amber-50"> 
            <img src={data.image} className="w-50 aspect-square object-fit mx-auto"/>
            <h2 className="text-2xl text-center">{data.title}</h2>
            <p className="text-md text-center text-green-600 font-bold">$ {data.price} </p>
            <p className="text-sm text-justify"> {data.description}</p>
        </div>
    )

}