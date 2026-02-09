export default function FilterCard({data, filterCategory}) {
  
    return (
        <> 
         <button className="border p-2 rounded-xl cursor-pointer bg-blue-100 hover:bg-green-100" onClick={() => filterCategory(data.name)}>{data.name}</button>
        </>
    )
}