import { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard';
import FilterCard from './components/FilterCard'

function App() {
  // state is the products fetched
  const [master_data, setMaster] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [chosen_category, setChosenCategory] = useState('All');

  const PROD_API = 'https://fakestoreapi.com/products';

  // 1. fetch all data
  // 2. map each product and send data of title, desc, price
  // 3. get category
  // 4. map each filtercard
  // 5. hdlCategoryFilter
  // 6. current category should change
  // 7. handle all categories
  // 8. refactor category
  // maybe need to refetch state of products?

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
    <div className='app bg-gray-300'>
      <h1>Products Fetch & Filter</h1>
      <hr />
      <p>Current Category: {chosen_category}, Amount: {products.length}</p>
      <div className="filter-area flex gap-1">
        {categories.map( category_obj => <FilterCard key={category_obj.id} data={category_obj} filterCategory={filterCategory}/>)}
      </div>
      <div className="product-gallery">
        {products.map( product_obj => <ProductCard key={product_obj.id} data={product_obj}/>)}
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
