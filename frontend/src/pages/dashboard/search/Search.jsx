import { makeRequest } from '../../../axios';

import { FaHouseUser } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Search = () => {

const { isLoading, error, data } = useQuery(['customers'], () =>
  makeRequest.get("/customers/getcustomers").then(res => {
    setCustomerData(res.data);
    return res.data;
  })
);

const [customerData, setCustomerData] = useState([]);
const [productsData, setProductsData] = useState([]);

console.log(customerData);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Make an AJAX request to the search API
    fetch(`http://localhost:3000/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error('Error:', error));
  };


  return (
    <>
    <div>Search</div>
    <div className='searchPage'>
    
      <input
      className='searchBoxInput'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
  

<div className='searchData row'>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-customers-tab" data-bs-toggle="pill" data-bs-target="#pills-customers" type="button" role="tab" aria-controls="pills-customers" aria-selected="true">Customers</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-products-tab" data-bs-toggle="pill" data-bs-target="#pills-products" type="button" role="tab" aria-controls="pills-products" aria-selected="false">Products</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-customers" role="tabpanel" aria-labelledby="pills-customers-tab">
  <ul>
          {error ? "Something went wrong!" : (isLoading
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
            : customerData.map((customer) => 
              
              <li key={customer.id}><Link title="Edit" to={`/dashboard/customer/${customer.id}`} > <FaHouseUser/> {customer.first_name} {customer.middle_name} {customer.last_name} </Link></li>
              
            
            ))}
        
            </ul>
  </div>
  <div class="tab-pane fade" id="pills-products" role="tabpanel" aria-labelledby="pills-products-tab">...</div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>






<div className='searchCustomer'>







</div>



            </div>
    </div>

    </>
  )
}

export default Search