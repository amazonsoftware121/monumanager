import React from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'
import { Link } from 'react-router-dom';

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
: data.map((jobs) => <tr key={jobs.id}> 
<td> {jobs.id} </td>
<td>{jobs.status}</td>
<td>{jobs.notes}</td>
<td> <button className='btn btn-success mx-3'><Link to={`/dashboard/job/${jobs.id}`}><FaEdit /></Link></button> </td>
 </tr>))}</tbody>
</table>
  </div>
)
}

export default Jobs








    

