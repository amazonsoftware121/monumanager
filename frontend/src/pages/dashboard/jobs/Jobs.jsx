import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import { navigator } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { useState } from 'react';

const Jobs = () => {
  const {isLoading, error, data } = useQuery(['jobs'], () =>
  makeRequest.get("/jobs/getjobs").then(res=>{
      return res.data;
  })
  );
console.log(data);




const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [jobMessage, setJobMessage] = useState(null);
const [jobData, setJobData] = useState(data);



  const showDeleteModal = (jobNotes,id) => {
    setId(id);
    setJobMessage(null);
      setDeleteMessage(`Are you sure you want to delete '${jobNotes}'?`);
    setDisplayConfirmationModal(true);
  };

// Hide the modal
const hideConfirmationModal = () => {
  setDisplayConfirmationModal(false);
};


 // Handle the actual deletion of the item
 const submitDelete = async (id) => {

  try {
    const response = await makeRequest.delete("/jobs/deletejob/"+id);
    makeRequest.get("/jobs/getjobs").then(res => {
      setJobData(res.data);
    });
    setJobMessage(`Job was deleted successfully.`);



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

  const handleDelete = async (id) => {

    try {

      const response = await makeRequest.delete("/jobs/deletejob/"+id);
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }



return (
  <div className='jobs'>
  <h3 className='text-center mt-5 text-uppercase'>Jobs</h3>
  <table className="table table-striped">
  <thead>
    <tr>
      <th>Id</th>
      <th>Status</th>
      <th>Notes</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
{error ? "Something went wrong!" :  (isLoading
? <tr><td width="100%"><ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true} /></td></tr>
: data.map((job) => <tr key={job.id}> 
<td> {job.id} </td>
<td>{job.status}</td>
<td>{job.notes}</td>
<td> <Link title="Edit" to={`/dashboard/job/${job.id}`}><FaEdit /></Link> <span title='Delete' className="iconBtn" onClick={() => showDeleteModal(job.notes, job.id)}><FaTrash color="red" /></span>   </td>

 </tr>))}</tbody>
</table>
<DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
  </div>
)
}

export default Jobs








    

