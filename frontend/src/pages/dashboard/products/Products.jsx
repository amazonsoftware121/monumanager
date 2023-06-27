import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import DeleteConfirmation from '../../../components/DeleteConfirmation';

const Products = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(['products'], () =>
    makeRequest.get('/products/getproducts').then((res) => {
      return res.data;
    })
  );

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [productMessage, setProductMessage] = useState(null);

  const showDeleteModal = (productDesc, id) => {
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
      await makeRequest.delete(`/products/deleteproduct/${id}`);
      setProductMessage(`Product was deleted successfully.`);
      setDisplayConfirmationModal(false);
      // Invalidate the query and refetch data
      queryClient.invalidateQueries('products');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="products">
        <h3 className="text-center mt-5 text-uppercase">Products</h3>
        {productMessage && (
          <p className="text-center text-success">
            <strong>{productMessage}</strong>
          </p>
        )}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Color</th>
              <th>Options</th>
              <th>Price</th>
              <th>Quantity on Hand</th>
              <th>Image</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="9">Something went wrong!</td>
              </tr>
            ) : isLoading ? (
              <tr>
                <td colSpan="9">
                  <div className="d-grid justify-content-center text-center">
                    <ThreeDots height="80" width="80" radius="9" color="#4fa94d" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((product) => (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.description}</td>
                  <td>{product.color == "undefined" ? "N/A" :  product.color}</td>
                  <td>{product.options == "undefined" ? "N/A" : product.options}</td>
                  <td>{!product.price  ? "N/A" : product.price}</td>
                  <td>{ !product.quantity_on_hand  ? "N/A" : product.quantity_on_hand}</td>
                  <td>{!product.image ? "N/A" : <img src={`https://amaronsoftware.com/monumanagerapi/static/${product.image}`} width={50} />}</td>
                  <td>{product.size == "undefined" ? "N/A" : product.size}</td>
                 
                  <td> <Link title="Edit" to={`/dashboard/product/edit/${product.id}`} state={product}><FaEdit /></Link> <span title='Delete' className="iconBtn" onClick={() => showDeleteModal(` ${product.description}`,product.id)}><FaTrash color="red" /></span>   </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
      </div>
    </>
  );
};

export default Products;
