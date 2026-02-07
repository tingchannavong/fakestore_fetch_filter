export default function ProductCard({data}) {

    return (
        <> 
            <img src={data.image}/>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>{data.price}</p>
        </>
    )

}