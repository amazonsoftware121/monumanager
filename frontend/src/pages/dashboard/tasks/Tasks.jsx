import React from 'react'
import { useQuery } from 'react-query';
import { makeRequest } from '../../../axios';
import { FaEdit } from 'react-icons/fa';
import { ThreeDots } from  'react-loader-spinner'


const Tasks = () => {

    const {isLoading, error, data } = useQuery(['tasks'], () =>
    makeRequest.get("/tasks/gettasks").then(res=>{
        return res.data;
    })
    );
console.log(data);

  return (
    <div className='customers'>
    <h3 className='text-center mt-5 text-uppercase'>Tasks</h3>
   </div>
 
  )
}

export default Tasks