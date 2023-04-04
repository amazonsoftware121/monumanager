import "./order.scss";
import {FaHome,FaPlus} from "react-icons/fa";
import Calendar from "react-calendar";
import TopNav from "../../../components/topnav/TopNav";
import dummy from "../../../images/dummy.jpg";
import 'react-calendar/dist/Calendar.css';
import { useState,useContext } from 'react';
import {StepperContext} from '../../../context/StepperContext';
const Order = () => {
  const [textInput, setTextInput] = useState("");
  const {userData, setUserData} = useContext(StepperContext);
const handleChange = (e) =>{
  setTextInput(e.target.value);
}

const onSubmits = (e) =>{
  e.preventDefault();
  console.log(textInput);
}
  return (
    <>
    <div className="order">
    <h2 className='text-center my-3'>Order</h2>
<TopNav navLink="/dashboard/job" />
    
    <div className="row">
      <div className="col-8 px-5">
<form onSubmit={onSubmits}>

<div className=''>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>


<button className="btn btn-primary" type="submit">Submit</button>
</form>

<div className="calender mt-5"><Calendar  /></div>


<div className="latestUpdate mt-5">
                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Customer Info</div>
<p>Secondar text</p>
                      </div>
                    </div>


                    <div className="item">
                      <div className="leftContent">
<img src={dummy} alt='' width={75} height={75} />
                      </div>

                      <div className="rightContent">
<div className="title">Product Info</div>
<p>Secondar text</p>
                      </div>
                    </div>

                  

                   
                


                   




            
                   


                    

                   

                 


</div>


                  <div className="addService float-end">
  <button className="btn btn-secondary"> <FaPlus /> Add Service</button>
</div>


      </div>

      <div className="col-4 px-5">
        <h3>Services</h3>

        <div className="serviceList">
          <ul>
            <li><span><FaHome /></span> Task 1 </li>
            <li><span><FaHome /></span> Task 2 </li>
            <li><span><FaHome /></span> Task 3 </li>
            <li><span><FaHome /></span> Task 4 </li>
          </ul>

        </div>

        <select class="form-select form-select-lg my-5" aria-label=".form-select-lg example">
  <option selected>Status</option>
  <option value="1">Approve</option>
  <option value="2">Pending</option>
  <option value="3">Ready</option>
</select>




      </div>
    </div>



    </div>
    </>
  )
}

export default Order