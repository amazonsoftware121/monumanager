import React, {useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import PageTitle from '../../../components/PageTitle';
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const Carvings = () => {

  const[carvings, setCarvings] = useState([]);

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [carvingMessage, setCarvingMessage] = useState(null);




  const showDeleteModal = (id) => {
    setId(id);
    setCarvingMessage(null);
    setDeleteMessage(`Are you sure you want to delete '${id}'?`);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };


  // Handle the actual deletion of the item
  const submitDelete = async (id) => {

    try {
      const response = await makeRequest.delete("/carvings/deletecarving/" + id);
      setCarvingMessage(`Carving was deleted successfully.`);
      setDisplayConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchData  =  async () => {
      try {
        const response = await makeRequest.get("carvings/getcarvings/")
        setCarvings(response.data);  
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [submitDelete]);


  return (
    <>
   <div className='carvings'>
   <PageTitle title={"Carvings"} />
   <div class="addnew"><Link to="addcarving" className='btn btn-primary btn-lg mb-4' >Add Carving</Link> </div>

   {carvingMessage && <p className="text-center text-success"><strong>{carvingMessage}</strong></p>}
  <table className="table table-striped">
  <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Birth Date</th>
      <th>Passing Date</th>
      <th>Position</th>
      <th>Side</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>


{ carvings && carvings.map((carving) => <tr> 
<td> {carving.id} </td>
<td>{carving.first_name} {carving.middle_name} {carving.last_name}</td>
<td> <Moment format="D MMM YYYY" withTitle>{carving.birth_date}</Moment></td>
<td><Moment format="D MMM YYYY" withTitle>{carving.passing_date}</Moment></td>
<td>{carving.position}</td>
<td>{carving.side}</td>
<td> <Link title="Edit" to={`/dashboard/carving/edit/${carving.id}`} state={carving}><FaEdit /></Link> <span title='Delete' class="iconBtn" onClick={() => showDeleteModal(carving.id)}><FaTrash color="red" /></span>   </td>
 </tr> )}
</tbody>
</table>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
  </div>
</>

  )
}

export default Carvings


