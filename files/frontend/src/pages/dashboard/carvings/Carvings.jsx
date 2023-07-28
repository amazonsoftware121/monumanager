import React, {useState} from 'react';
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import PageTitle from '../../../components/PageTitle';



const Carvings = () => {
  const {isLoading, error, data } = useQuery(['carvings'], () =>
  makeRequest.get("/carvings/getcarvings").then(res=>{
      return res.data;
  })
  );
console.log(data);

const [succ, setSucc] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await makeRequest.delete("carvings/deletecarving/"+id)
      window.location.reload();
      setSucc(response);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
   <div className='carvings'>
   <PageTitle title={"Carvings"} />

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
visible={false}
/>
: data && data.map((carving) => <tr> 
<td> {carving.id} </td>
<td>{carving.first_name} {carving.middle_name} {carving.last_name}</td>
<td> <Moment format="D MMM YYYY" withTitle>{carving.birth_date}</Moment></td>
<td><Moment format="D MMM YYYY" withTitle>{carving.passing_date}</Moment></td>
<td>{carving.position}</td>
<td>{carving.side}</td>
<td> <Link title="Edit" to={`/dashboard/carving/edit/${carving.id}`}><FaEdit /></Link> <span title='Delete' class="iconBtn" onClick={() => handleDelete(carving.id)}><FaTrash color="red" /></span>   </td>
 </tr> ))}
</tbody>
</table>
  </div>
</>

  )
}

export default Carvings