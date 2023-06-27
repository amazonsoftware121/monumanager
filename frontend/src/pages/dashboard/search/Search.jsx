import { makeRequest } from '../../../axios';
import { FaHouseUser } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Search = () => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [carvingsData, setCarvingsData] = useState([]);
  const [jobsData, setJobsData] = useState([]);

  const { isLoading, error, data } = useQuery(['products'], () => {
    return Promise.all([
      makeRequest.get('/customers/getcustomers').then((res) => res.data),
      makeRequest.get('/products/getproducts').then((res) => res.data),
      makeRequest.get('/tasks/gettasks').then((res) => res.data),
      makeRequest.get('/jobs/getjobs').then((res) => res.data),
      makeRequest.get('/carvings/getcarvings').then((res) => res.data)
    ]).then(([customersData, productsData,tasksData,jobsData, carvingsData]) => {
      setFilteredData(customersData);
      setProductsData(productsData);
      setTasksData(tasksData);
      setJobsData(jobsData);
      setCarvingsData(carvingsData);
      return customersData;
    });
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Apply the filter whenever the filter value changes
  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const firstName = item.first_name ? item.first_name.toLowerCase() : '';
        const lastName = item.last_name ? item.last_name.toLowerCase() : '';
        const middleName = item.middle_name != null ? item.middle_name.toLowerCase() : null;
        const fullName = middleName !== null ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
        return fullName.includes(filter.toLowerCase());
      });
      setFilteredData(filtered);
    }
  }, [filter, data]);

  return (
    <>
      
      <div className='searchPage'>
     
        <div className='searchData row'>
          
          <div className='col-md-12'>
          
          <ul className='nav nav-pills mb-3 justify-content-center' id='pills-tab' role='tablist'>
            <li className='nav-item' role='presentation'>
              <button
                className='nav-link active'
                id='pills-customers-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-customers'
                type='button'
                role='tab'
                aria-controls='pills-customers'
                aria-selected='true'
              >
                Customers
              </button>
            </li>

            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='pills-products-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-products'
                type='button'
                role='tab'
                aria-controls='pills-products'
                aria-selected='true'
              >
                Products
              </button>
            </li>


            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='pills-orders-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-orders'
                type='button'
                role='tab'
                aria-controls='pills-orders'
                aria-selected='true'
              >
                orders
              </button>
            </li>

            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='pills-services-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-services'
                type='button'
                role='tab'
                aria-controls='pills-services'
                aria-selected='true'
              >
                services
              </button>
            </li>

            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='pills-carvings-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-carvings'
                type='button'
                role='tab'
                aria-controls='pills-carvings'
                aria-selected='true'
              >
                carvings
              </button>
            </li>


            <li className='nav-item' role='presentation'>
              <button
                className='nav-link'
                id='pills-tasks-tab'
                data-bs-toggle='pill'
                data-bs-target='#pills-tasks'
                type='button'
                role='tab'
                aria-controls='pills-tasks'
                aria-selected='true'
              >
                tasks
              </button>
            </li>


            {/* Other tab buttons */}
          </ul>
          <div className='tab-content' id='pills-tabContent'>
            <div
              className='tab-pane fade show active'
              id='pills-customers'
              role='tabpanel'
              aria-labelledby='pills-customers-tab'
            >

<div className='searchBar text-center mt-3'>
    
        <input
          className='searchBoxInput'
          type='text'
          placeholder='Search here'
          value={filter}
          onChange={handleFilterChange}
        />
        </div>

              <ul>
                {filteredData.map((customer) => (
                  <li key={customer.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/customer/${customer.id}`}
                    >
                      <FaHouseUser /> {customer.first_name} {customer.middle_name} {customer.last_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            


            <div
              className='tab-pane fade show'
              id='pills-products'
              role='tabpanel'
              aria-labelledby='pills-products-tab'
            >

<div className='searchBar text-center mt-3'>
    
    <input
      className='searchBoxInput'
      type='text'
      placeholder='Search here'
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
              <ul>
                {productsData.map((product) => (
                  <li key={product.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/product/edit/${product.id}`}
                    >
                      <FaHouseUser /> {product.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            <div
              className='tab-pane fade show'
              id='pills-orders'
              role='tabpanel'
              aria-labelledby='pills-orders-tab'
            >

<div className='searchBar text-center mt-3'>
    
    <input
      className='searchBoxInput'
      type='text'
      placeholder='Search here'
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
              <ul>
                {jobsData.map((job) => (
                  <li key={job.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/customers/${job.customerid}/job//edit/${job.id}`}
                    >
                      <FaHouseUser /> {job.notes}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className='tab-pane fade show'
              id='pills-services'
              role='tabpanel'
              aria-labelledby='pills-services-tab'
            >

<div className='searchBar text-center mt-3'>
    
    <input
      className='searchBoxInput'
      type='text'
      placeholder='Search here'
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
              <ul>
                {filteredData.map((customer) => (
                  <li key={customer.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/customer/${customer.id}`}
                    >
                      <FaHouseUser /> {customer.first_name} {customer.middle_name} {customer.last_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            


            <div
              className='tab-pane fade show'
              id='pills-carvings'
              role='tabpanel'
              aria-labelledby='pills-carvings-tab'
            >

<div className='searchBar text-center mt-3'>
    
    <input
      className='searchBoxInput'
      type='text'
      placeholder='Search here'
      value={filter}
      onChange={handleFilterChange}
    />
    </div>
              <ul>
                {productsData.map((product) => (
                  <li key={product.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/product/edit/${product.id}`}
                    >
                      <FaHouseUser /> {product.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


            <div
              className='tab-pane fade show'
              id='pills-tasks'
              role='tabpanel'
              aria-labelledby='pills-tasks-tab'
            >

            <div className='searchBar text-center mt-3'>
    
        <input
          className='searchBoxInput'
          type='text'
          placeholder='Search here'
          value={filter}
          onChange={handleFilterChange}
        />
        </div>
              <ul>
                {tasksData.map((task) => (
                  <li key={task.id}>
                    <Link
                      title='Edit'
                      to={`/dashboard/task/edit/${task.id}`}
                    >
                      <FaHouseUser /> {task.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>



          </div>
</div>
   

        </div>
      </div>
    </>
  );
};

export default Search;
