import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard'
import FilterCard from './components/FilterCard'

// 1. fetch all data
// 2. map each product and send data of title, desc, price
// 3. get category
// 4. map each filtercard
// 5. hdlCategoryFilter
// 6. current category should change
// 7. handle all categories
// 8. refactor category
// 9. no need to refetch state of products as it be refethced with each page refresh alrd...

function App() {
  // state is the products fetched
  const [master_data, setMaster] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [chosen_category, setChosenCategory] = useState('All');

  const PROD_API = 'https://fakestoreapi.com/products';

  useEffect( () => {
    fetch(PROD_API)
    .then(response => response.json())
    .then(data => { 
      setProducts(data);
      setMaster(data);
      const unique_cat = new Set(data.map( product => product.category));
      const convertedArray = [...categories, ...unique_cat];
      const category_objects = convertedArray.map( (category, i) => { return {id: i, name: category}});
      setCategories(category_objects);
    });
  }, []);

   const filterCategory = (user_choice) => { 
    setChosenCategory(user_choice);

    if (user_choice === 'All') {
      setProducts(master_data);
      return;
    }

    const filtered_products = master_data.filter( obj => obj.category === user_choice); 
    setProducts(filtered_products);
  
  }

  return (
    <div className='app bg-gray-100 w-screen font-mono'>
      <h1 className="p-3 text-5xl text-center font-mono capitalize text-red-700">FAKESTORE</h1>
      <hr className="border-white" />
      <div className="container w-full mx-auto p-2 flex flex-col gap-3">
        <h1 className="text-2xl">Our Products</h1>
        <p>Current Category: {chosen_category}, Amount: {products.length} Products</p>
        <div className="filter-area flex flex-wrap gap-3 items-center">
          <p text-center>Filter: </p>
          {categories.map( category_obj => <FilterCard key={category_obj.id} data={category_obj} filterCategory={filterCategory}/>)}
        </div>
        <div className="product-gallery gap-3 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {products.map( product_obj => <ProductCard key={product_obj.id} data={product_obj}/>)}
        </div>
      </div>
    </div>
  )
}

export default App

// ARCHIVED INEFFICIENT SOLUTION
// fetch all products again
// fetch(PROD_API)
// .then(response => response.json())
// .then(data => { 
//    const filtered_products = data.filter( obj => obj.category === user_choice); 
//    setProducts(filtered_products);
// });