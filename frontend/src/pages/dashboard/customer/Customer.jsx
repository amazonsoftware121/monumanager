import './customer.scss'
import { useState, useContext } from 'react';
import { StepperContext } from '../../../context/StepperContext';
import { FaHome, FaPlus } from 'react-icons/fa';
import Calendar from "react-calendar";
import dummy from "../../../images/dummy.jpg";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Button from '../../../components/Button';
const Customer = (props) => {
    const { userData, setUserData } = useContext(StepperContext);
    const [order, setOrder] = useState(false);

    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);


    const [display, setDisplay] = useState("false");

    const toggleDisplay = () => {
        if (!display) {
            setDisplay(true);
        }
        else {
            setDisplay(false);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        /*setInputs({ ...inputs, [e.target.name]: e.target.value });*/
        setUserData({ ...userData, [name]: value });
    };

    const handleOnChange = () => {
        if (!false) {
            setOrder(true);
        }
        else {
            setOrder(false);
        }
    }

    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4500/api/customers/addcustomer", userData);
            //console.log(response.data);
            setSucc(response.data);
            console.log(response.data);
        } catch (err) {
            setErr(err.response.data);
        }
    }
    //    console.log(inputs)

    return (
        <>

            <div className='customer'>
                <h2 className='text-center my-3'>Customer</h2>
                <div className='row'>
                    <div className='col-7'>
                        <div className='cardItem shadow p-3 mx-3'>
                            <form onSubmit={handleClick}>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["first_name"] || ""} name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Firstname</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["middle_name"]} name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Middlename</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["last_name"]} name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Lastname</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["phone"]} name="phone" className="form-control" placeholder="phone" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Phone</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>

                                        <div className="form-floating mb-3">
                                            <input type="email" value={userData["email"]} name="email" className="form-control" placeholder="email" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="address" value={userData["address"]} className="form-control" style={{ height: "150px" }} placeholder="address" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Address</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" value={userData["notes"]} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                </div>


                                {err && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>{err}</strong>


                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}

                                {succ && <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong>{succ}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}

                                <div className='buttonWrapper'>


                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleClick} />

                                    <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-5'>
                        <div className='cardItem shadow p-3 mx-3'>
                            <div className='recentOrderWrapper'>
                                <div className='recentOrderButton'>
                                    <div className="form-check form-switch">
                                        <input onClick={toggleDisplay} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><strong>Show Recent Orders</strong></label>
                                    </div>
                                </div>

                                <div className='recentOrders' style={display ? { display: "none" } : { display: "block" }} >
                                    <ul>
                                        <li><span><FaHome /></span> Order 001</li>
                                        <li><span><FaHome /></span> One-fine Order 002</li>
                                        <li><span><FaHome /></span> Order 003</li>
                                    </ul>
                                </div>

                                <div className='addOrder mt-5'>
                                    <button onClick={() => props.showOrder(2)} className='btn btn-secondary' >Add Order</button>
                                </div>


                             

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )





}

const Order = (props) => {

    const { userData, setUserData } = useContext(StepperContext);
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        /*setInputs({ ...inputs, [e.target.name]: e.target.value });*/
        setUserData({ ...userData, [name]: value });
    };

    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4500/api/customers/addcustomer", userData);
            //console.log(response.data);
            setSucc(response.data);
            console.log(response.data);
        } catch (err) {
            setErr(err.response.data);
        }
    }
    //    console.log(inputs)
    return (
        <>
            <div className="order">
                <h2 className='text-center my-3'>Order</h2>

                <div className="row">
                    <div className="col-8 px-5">
                        <form onSubmit={handleClick}>

                            <div className=''>
                                <div className="form-floating mb-3">
                                    <textarea value={userData["order_notes"] || ""} name="order_notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                    <label htmlFor="floatingInput">Notes</label>
                                </div>
                            </div>


                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>

                        <div className="calender mt-5"><Calendar /></div>


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
                        
                        <button className="btn btn-success"  onClick={() => props.showOrder(3)}  > Status </button>

                                                




                    </div>
                </div>



            </div>
        </>
    )
}

const Product = () => {
    return (
        <div>Product</div>
    )
}

const Task = () => {
    return (
        <div>Task</div>
    )
}


const CarvingType = () => {
    return (
        <div>CarvingType</div>
    )
}


const Carving = () => {
    return (
        <div>Carving</div>
    )
}

const Status = () =>{

    const [checkList, setCheckList] = useState("");
    const [Items, setItems] = useState([]);

    const itemEvent = (event) =>{
        setCheckList(event.target.value);
    };

    const listOfItems = () =>{

    }

    return(
        <>
        <div className='status'>
            
            <h2 className='text-center my-3'>Status</h2>
        
        <div className='mainDiv'>
            <div className="mainWrapper">
<div className='row'>
    <div className='col-md-6 col-sm-12'>

<div className='statusList'>
    <ol>
{ Items.map( (statusval) => {
    return   (    
        <>
          <li>
        <div className="form-check">
  <input className="form-check-input" name="status" type="radio" value={Items.value} />
  <label className="form-check-label" htmlFor="">
{Items.value}
  </label>
</div>

        </li>
        </>
    )
}) }

    </ol>

</div>

        <div className='row'>
            <div className='col-sm-10'>
            <div className="form-floating mb-3">
                                            <input type="text"   className="form-control" placeholder="phone" required />
                                            <label htmlFor="floatingInput">Add New Status</label>
                                        </div>
                                        </div>
   <div className='col-sm-2'>
                <Button btnDesign='btn btn-primary roundButton' btnText="+" /> 
                </div>

                <Button btnDesign="btn btn-success" btnText="Save" onClick={""} />
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

const OrderServices = () => {
    return (
        <div>OrderServices</div>
    )
}



export default Customer;
export { Status, Order, OrderServices, Carving, CarvingType, Task, Product }