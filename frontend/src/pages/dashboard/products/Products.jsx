import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { useState } from 'react';


const Products = () => {
  const { isLoading, error, data } = useQuery(['products'], () =>
    makeRequest.get("/products/getproducts").then(res => {
      return res.data;
    })
  );


  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [productMessage, setProductMessage] = useState(null);
const [productData, setProductData] = useState(data);



  const showDeleteModal = (productDesc,id) => {
    setId(id);
    setProductMessage(null);
      setDeleteMessage(`Are you sure you want to delete '${productDesc}'?`);
    setDisplayConfirmationModal(true);
  };

// Hide the modal
const hideConfirmationModal = () => {
  setDisplayConfirmationModal(false);
};

 // Handle the actual deletion of the item
 const submitDelete = async (id) => {

  try {
    const response = await makeRequest.delete("/products/deleteproduct/"+id);
    setProductMessage(`Product was deleted successfully.`);



    setDisplayConfirmationModal(false);
    makeRequest.get("/products/getproducts").then(res => {
      setProductData(res.data);
    });
    
  } catch (error) {
    console.log(error);
  }
};


  console.log(data);
  return (
    <>
      <div className='products'>
       
        <h3 className='text-center mt-5 text-uppercase'>Products</h3>
        {productMessage && <p className="text-center text-success"><strong>{productMessage}</strong></p>}
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
                 
                  <td> <Link title="Edit" to={`/dashboard/product/${product.job_id}/${product.id}`} state={product}><FaEdit /></Link> <span title='Delete' className="iconBtn" onClick={() => showDeleteModal(` ${product.description}`,product.id)}><FaTrash color="red" /></span>   </td>
                </tr>
)
              }))}
          </tbody>
        </table>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
      </div>
    </>
  )
}

export default Products