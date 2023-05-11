import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
const Products = () => {
  const { isLoading, error, data } = useQuery(['products'], () =>
    makeRequest.get("/products/getproducts").then(res => {
      return res.data;
    })
  );
  console.log(data);
  return (
    <>
      <div className='products'>
       
        <h3 className='text-center mt-5 text-uppercase'>Products</h3>
    <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Color</th>
              <th>options</th>
              <th>price</th>
              <th>quantity_on_hand</th>
              <th>Image</th>
              <th>size</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {error ? "Something went wrong!" : (isLoading
              ? <div className='d-grid justify-content-center text-center'><ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 /></div> : data.map((product) => {
return (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.description}</td>
                  <td>{product.color}</td>
                  <td>{product.options}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity_on_hand}</td>
                  <td><img src={`https://amaronsoftware.com/monumanagerapi/static/${product.image}`} width={50} /></td>
                  <td>{product.size}</td>
                 
                  <td><button className='btn btn-success mx-3' onClick={""}><FaEdit /></button></td>
                </tr>
)
              }))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products