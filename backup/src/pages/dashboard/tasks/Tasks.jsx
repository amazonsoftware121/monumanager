import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'
import PageTitle from '../../../components/PageTitle';
import DeleteConfirmation from "../../../components/DeleteConfirmation";

const Tasks = () => {


  const[tasks, setTasks] = useState([]);

  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [taskMessage, setTaskMessage] = useState(null);




  const showDeleteModal = (id) => {
    setId(id);
    setTaskMessage(null);
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
      const response = await makeRequest.delete("tasks/deletetask/"+id);
      setTaskMessage(`Task was deleted successfully.`);
      setDisplayConfirmationModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(()=>{
    const fetchData  =  async () => {
      try {
        const response = await makeRequest.get("/tasks/gettasks/")
        setTasks(response.data);  
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [submitDelete]);


  
  return (
    <>
      <div className='tasks'>

      <PageTitle title={"Tasks"} />
      {taskMessage && <p className="text-center text-success"><strong>{taskMessage}</strong></p>}        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Creation Time</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { tasks.map((task, key) => {
                return (
                  <tr key={task.id}>

                    <td> {task.id} </td>
                    <td>{task.description}</td>
                    <td><Moment format="D MMM YYYY" withTitle>{task.creation_time}</Moment></td>
                    <td><Moment format="D MMM YYYY" withTitle>{task.due_date}</Moment></td>
                    <td> <Link title="Edit" to={`/dashboard/task/edit/${task.id}`}><FaEdit /></Link> <span title='Delete' class="iconBtn" onClick={() => showDeleteModal(task.id)}><FaTrash color="red" /></span>   </td>
                  </tr>)
              })}
          </tbody>
        </table>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
      </div>
    </>
  )
}

export default Tasks