import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash,FaUser,FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PageTitle from '../../../components/PageTitle';


const Customers = () => {
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    makeRequest.get("/customers/getcustomers").then((res) => {
      setCustomerData(res.data);
    })
  }, []);


 
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [customerMessage, setCustomerMessage] = useState(null);




  const showDeleteModal = (customerName, id) => {
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
      const response = await makeRequest.delete("/customers/deletecustomer/" + id);
      makeRequest.get("/customers/getcustomers").then(res => {
        setCustomerData(res.data);
      });
      setCustomerMessage(`Customer was deleted successfully.`);
      setDisplayConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };







  console.log(customerData);

  const navigate = useNavigate();

  const handleEdit = async (e) => {
    navigate("/dashboard/job");
  }



  return (
    <div className='customers'>
      <PageTitle title={"Customers"} />
      <div class="addnew"><Link to="/dashboard/customer/addcustomer" className='btn btn-primary btn-lg mb-5' >Add Customer</Link> </div>


      {customerMessage && <p className="text-center text-success"><strong>{customerMessage}</strong></p>}
      
      <div className='row'>
      
          {customerData.map((customer) => <div className='col-md-3' key={customer.id}>
          <div class="card mb-3">
      <div class="card-body">
            
            <h6 class="card-title" ><small className='me-2'><FaUser /></small>{customer.first_name} {customer.middle_name} {customer.last_name}</h6>
            <p class="card-text customerEmail"><FaEnvelope className='me-2' />{customer.email || <Skeleton />}</p>
            <p class="card-text"><FaPhoneAlt className='me-2' />{customer.phone || <Skeleton />}</p>
            <div class="d-flex justify-content-between"> <Link className='btnEdit' title="Edit" to={`/dashboard/customer/${customer.id}`} state={customer}><FaEdit /></Link> <span title='Delete' className="iconBtn btnDelete" onClick={() => showDeleteModal(`${customer.first_name} ${!customer.middle_name ? "" : customer.middle_name} ${customer.last_name}`, customer.id)}><FaTrash /></span>   </div>
            </div>
            </div>
          </div>)}
      </div>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
    </div>
  )
}

export default Customers;