import { Link, useNavigate } from 'react-router-dom';
import './dashboard.scss';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaSearch, FaPlus, FaCog } from 'react-icons/fa';
import dummy from "../../images/dummy.jpg";
import axios from 'axios';
//import Products from '../products/Products';
import Product from './product/Product';




const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [jobid, setJobid] = useState(null);
  const handleClick = async (e) => {
       
    e.preventDefault();
  
    try {
     
    const response = await axios.post("http://localhost:4500/api/jobs/jobadd", { data: 1 });
    setJobid(response.data.jobId);
   navigate("/dashboard/customer");
                        

  } catch (err) {
    setErr(err.response.data);
  }
    
  }

  return (
    <>

      <div className="adminContent">
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="rightBar col py-3">

              <div className='row flex-nowrap'>
                <div className='col-6 '>

                 
                  <div className="calender">

                    <div className="container shadow py-4 d-flex flex-column align-items-center">

                      <div className="input-group pb-3">
                        <input className="form-control form-control-lg border-end-0 border rounded-pill" type="search" value="search" id="example-search-input" />
                        <span className="input-group-append">
                          <button className="btn btn-lg btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" type="button">
                            <FaSearch />
                          </button>
                        </span>
                      </div>

                      <Calendar onChange={onChange} value={value} />

                    </div>


                  </div>
                </div>



                <div className="col-6 px-5">
                  <div className="topButton d-flex justify-content-center mb-4">
                    <div className="buttonInner">
                      <button className='btn btn-primary btn-lg'>
                        <FaSearch />
                      </button>

                      <button className='btn btn-success btn-lg mx-3'  onClick={handleClick}>

                      <FaPlus />
                      
                      </button>

                      <button className='btn btn-lg'>
                        <FaCog />
                      </button>


                    </div>
                  </div>



                  <div className="latestUpdate">
                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Recent Updates</div>
<p>Secondar text</p>
                      </div>
                    </div>

                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Task/Job Status Change </div>
<p>Secondar text</p>
                      </div>
                    </div>


                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Approval</div>
<p>Secondar text</p>
                      </div>
                    </div>


                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Carving</div>
<p>Secondar text</p>
                      </div>
                    </div>


                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Products</div>
<p>Secondar text</p>
                      </div>
                    </div>

                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Jobs</div>
<p>Secondar text</p>
                      </div>
                    </div>


                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Tasks</div>
<p>Secondar text</p>
                      </div>
                    </div>


            
                   


                    

                   

                  </div>



                </div>




              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard