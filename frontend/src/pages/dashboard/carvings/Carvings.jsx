import React from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'
import Moment from 'react-moment';



const Carvings = () => {
  const {isLoading, error, data } = useQuery(['carvings'], () =>
  makeRequest.get("/carvings/getcarving").then(res=>{
      return res.data;
  })
  );
console.log(data);

  return (
    <>
   <div className='carvings'>
  <h3 className='text-center mt-5 text-uppercase'>Carvings</h3>
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
{error ? "Something went wrong!" :  (isLoading
? <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
/>
: data.map((carving) => <tr> 
<td> {carving.id} </td>
<td>{carving.first_name} {carving.middle_name} {carving.last_name}</td>
<td> <Moment format="D MMM YYYY" withTitle>{carving.birth_date}</Moment></td>
<td><Moment format="D MMM YYYY" withTitle>{carving.passing_date}</Moment></td>
<td>{carving.position}</td>
<td>{carving.side}</td>
<td> <button className='btn btn-success mx-3' onClick={""}><FaEdit /></button> </td>
 </tr> ))}
</tbody>
</table>
  </div>
</>

  )
}

export default Carvings