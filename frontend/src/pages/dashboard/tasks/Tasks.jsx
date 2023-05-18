import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


const Tasks = () => {

  const { isLoading, error, data } = useQuery(['tasks'], () =>
    makeRequest.get("/tasks/gettasks").then(res => {
      return res.data;
    })
  );
  //const {...resData} = data;
  console.log(data);

  const [succ, setSucc] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await makeRequest.delete("tasks/deletetask/"+id)
      window.location.reload();
      setSucc(response);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='tasks'>
        <h3 className='text-center mt-5 text-uppercase'>Tasks</h3>
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
            {error ? "Something went wrong!" : (isLoading
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
              : data.map((task, key) => {
                return (
                  <tr key={task.id}>

                    <td> {task.id} </td>
                    <td>{task.description}</td>
                    <td><Moment format="D MMM YYYY" withTitle>{task.creation_time}</Moment></td>
                    <td><Moment format="D MMM YYYY" withTitle>{task.due_date}</Moment></td>
                    <td> <Link title="Edit" to={`/dashboard/job/${task.id}`}><FaEdit /></Link> <span title='Delete' class="iconBtn" onClick={() => handleDelete(task.id)}><FaTrash color="red" /></span>   </td>
                  </tr>)
              }))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Tasks