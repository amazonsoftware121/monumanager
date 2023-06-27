import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { useState } from 'react';

const Customers = () => {

  const { isLoading, error, data } = useQuery(['customers'], () =>
    makeRequest.get("/customers/getcustomers").then(res => {
      setCustomerData(res.data);
      return res.data;
    })
  );

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [customerMessage, setCustomerMessage] = useState(null);
const [customerData, setCustomerData] = useState(data);



  const showDeleteModal = (customerName,id) => {
    setId(id);
    setCustomerMessage(null);
      setDeleteMessage(`Are you sure you want to delete '${customerName}'?`);
    setDisplayConfirmationModal(true);
  };

// Hide the modal
const hideConfirmationModal = () => {
  setDisplayConfirmationModal(false);
};


 // Handle the actual deletion of the item
 const submitDelete = async (id) => {

  try {
    const response = await makeRequest.delete("/customers/deletecustomer/"+id);
    makeRequest.get("/customers/getcustomers").then(res => {
      setCustomerData(res.data);
    });
    setCustomerMessage(`Customer was deleted successfully.`);
    setDisplayConfirmationModal(false);
  } catch (error) {
    console.log(error);
  }
};






  
  console.log(data);

  const navigate = useNavigate();

  const handleEdit = async (e) => {
    navigate("/dashboard/job");
  }



  return (
    <div className='customers'>
      <h3 className='text-center mt-5 text-uppercase'>Customers</h3>
      {customerMessage && <p className="text-center text-success"><strong>{customerMessage}</strong></p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {error ? "Something went wrong!" : (isLoading
            ? <tr><td width="100%"><ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#4fa94d"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            /></td></tr>
            : customerData.map((customer) => <tr key={customer.id}>
              <td> {customer.id} </td>
              <td>{customer.first_name} {customer.middle_name} {customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td> <Link title="Edit" to={`/dashboard/customer/${customer.id}`} state={customer}><FaEdit /></Link> <span title='Delete' className="iconBtn" onClick={() => showDeleteModal(`${customer.first_name} ${!customer.middle_name ? "" : customer.middle_name} ${customer.last_name}`,customer.id)}><FaTrash color="red" /></span>   </td>
            </tr>))}
        </tbody>
      </table>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
    </div>
  )
}
 
export default Customers;