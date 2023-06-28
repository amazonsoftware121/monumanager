import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {GrStatusInfo } from 'react-icons/gr';
import { TbNotes } from 'react-icons/tb';
import { ThreeDots } from 'react-loader-spinner';
import { navigator } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from "react-bootstrap";
import DeleteConfirmation from "../../../components/DeleteConfirmation";
import { useState,useEffect } from 'react';
import PageTitle from '../../../components/PageTitle';
const Jobs = () => {
  const[jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
  makeRequest.get("/jobs/getjobs").then(res=>{
      setJobData(res.data);
      setIsLoading(false);
  })
});


const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [jobMessage, setJobMessage] = useState(null);



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
  <PageTitle title={"Jobs"} />

  
  
  <div className='row'>
{ jobData.map((job) => <div className='col-md-3' key={job.id}> 
<div class="card mb-3">
      <div class="card-body">
      <h6 class="card-title">{job.notes}</h6>
<p className='card-text'><GrStatusInfo className='me-2' />{job.status ? job.status : "Not Updated"}</p>

<div class="d-flex justify-content-between">  <Link title="Edit" to={`/dashboard/customer/${job.customer_id}/order/${job.id}`}><FaEdit /></Link> <span title='Delete' className="iconBtn" onClick={() => showDeleteModal(job.notes, job.id)}><FaTrash color="red" /></span>   </div>

</div>
</div> </div>)}</div>
<DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage}  />
  </div>
)
}

export default Jobs








    

