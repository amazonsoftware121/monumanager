import React from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'

const Jobs = () => {
  const {isLoading, error, data } = useQuery(['jobs'], () =>
  makeRequest.get("/jobs/getjobs").then(res=>{
      return res.data;
  })
  );
console.log(data);

return (
  <div className='jobs'>
  <h3 className='text-center mt-5 text-uppercase'>Jobs</h3>
  <table class="table table-striped">
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
: data.map((jobs) => <tr> 
<td> {jobs.id} </td>
<td>{jobs.status}</td>
<td>{jobs.notes}</td>
<td> <button className='btn btn-success mx-3' onClick={""}><FaEdit /></button> </td>
 </tr> ))}
</tbody>
</table>
  </div>
)
}

export default Jobs








    

