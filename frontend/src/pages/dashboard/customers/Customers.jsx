import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit,FaTrash } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'
import {navigator} from 'react-router-dom'
import {Link, useNavigate } from 'react-router-dom';


const Customers = () => {

    const {isLoading, error, data } = useQuery(['customers'], () =>
    makeRequest.get("/customers/getcustomers").then(res=>{
        return res.data;
    })
    );
    console.log(data);

    const navigate = useNavigate();
    const handleEdit = async (e) => {
      navigate("/dashboard/job");
    }
  
    const handleDelete = async (id)=>{
/*try {
  
  const response = await makeRequest.post("/jobs/addjob", userData);
  setSucc(response.data[0].successmsg);
    console.log(data);
} catch (error) {
  console.log(error);
}*/
    }

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
  <td> <Link to={`/dashboard/job/${customer.id}`}><FaEdit /></Link> <FaTrash color="red" onClick={()=>handleDelete(customer.id)}/>  </td>
   </tr> ))}
  </tbody>
  </table>
    </div>
  )
}

export default Customers