import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'


const Customers = () => {

    const {isLoading, error, data } = useQuery(['customers'], () =>
    makeRequest.get("/customers/getcustomers").then(res=>{
        return res.data;
    })
    );
    console.log(data);
  return (
    <div className='customers'>
    <h3 className='text-center mt-5 text-uppercase'>Customers</h3>
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
{error ? "Something went wrong!" :  (isLoading
  ? <div className='d-grid justify-content-center text-center'><ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 /></div>
  : data.map((customer) => <tr> 
  <td> {customer.id} </td>
  <td>{customer.first_name} {customer.middle_name} {customer.last_name}</td>
  <td>{customer.email}</td>
  <td>{customer.phone}</td>
  <td> <button className='btn btn-success mx-3' onClick={""}><FaEdit /></button> </td>
   </tr> ))}
  </tbody>
  </table>
    </div>
  )
}

export default Customers