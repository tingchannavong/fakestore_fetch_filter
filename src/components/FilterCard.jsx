export default function FilterCard({data, filterCategory}) {
  
    return (
        <> 
         <button className="border" onClick={() => filterCategory(data.name)}>{data.name}</button>
        </>
    )
}