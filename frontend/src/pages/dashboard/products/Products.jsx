import React from "react";
import Product from "../product/Product";
import "./products.scss"
import { useQuery } from 'react-query'
import { makeRequest} from "../../../axios"

  

const Products = () => {


  const { isLoading, error, data } = useQuery('products', () =>
  makeRequest.get("/products").then(res=>{
    return res.data;
  })
)

console.log(data);
  return (
    <div className="products">
    {/*data.map((product) =>(
      <Product product = {product} key={product.id} />
    ))*/}
    </div>
  )
}

export default Products