import React from 'react'
import { useEffect,useState } from 'react';
import { makeRequest } from '../../../axios';



const AddTasks = (props) => {

    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState(null);
  
console.log(props)

useEffect(()=>{
    const fetchData  =  async () => {
      try {
        const response = await makeRequest.get("/tasks/gettasks/")
        setTasks(response.data);  
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };


  const handleSubmit = (e) => {
e.preventDefault();
setSuccessMessage(null);
    console.log(selectedTasks);
    // Send the selected task IDs and the customer ID to the server
    makeRequest.post(`/tasks/addtaskcustomer/${props.customerId}`, {
      selectedTasks,
    })
    .then((response) => {
      console.log('Tasks have been selected and submitted to the server.');
      setSuccessMessage("Tasks Added Successfully");
      // You can handle further actions or user feedback here
    })
    .catch((error) => {
      console.error('Error submitting selected tasks:', error);
    });
  };

  



  return (
    <div className='relatedSection'><h5>Related Tasks</h5>
    <form onSubmit={handleSubmit}>
    <div className='relatedList'>
    { tasks.map((task, key) => {
return (
  <li key={task.id}>

   <input type="checkbox" onChange={() => handleCheckboxChange(task.id)}
checked={selectedTasks.includes(task.id)} name="product_taskid" value={task.id} id={task.id} />
    <label for={task.id}>{task.description}</label>
    </li>
)
   
  
})}
</div>
<button type='submit' className='mt-3 btn btn-primary'> Add Tasks</button>
{successMessage && <p className='text-success'>{successMessage}</p>}
</form>
</div>
  )
}

export default AddTasks