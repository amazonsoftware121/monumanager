import './customer.scss'
import { useState, useContext } from 'react';
import { StepperContext } from '../../../context/StepperContext';
import { FaHome, FaPlus } from 'react-icons/fa';
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
            const response = await axios.post("http://amaronsoftware.com/monumanagerapi/api/customers/addcustomer", userData);
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


                               

                                <div className='buttonWrapper'>


                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleClick} />

                                    <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" />
                                </div>

                               <p className='custResponse text-danger'> {err && err}</p>

                               <p className='custResponse text-success'>{succ && succ}</p>

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
     /*   try {
            const response = await axios.post("http://amaronsoftware.com/monumanagerapi/api/customers/addcustomer", userData);
            //console.log(response.data);
            setSucc(response.data);
            console.log(response.data);
        } catch (err) {
            setErr(err.response.data);
        }*/
        console.log(userData);
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
                                    <label htmlFor="floatingInput">Order Description</label>
                                </div>
                            </div>


                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="orderDueDate" className="form-label">Order Due Date</label>
                                    <input type='date' value={userData["order_due_date"] || ""} id='order_due_date' name="order_due_date" className="form-control" placeholder="notes" onChange={handleChange} />

                                </div>
                            </div>



                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>




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
                            <button className="btn btn-secondary" onClick={() => props.showOrder(4)}> <FaPlus /> Add Service</button>
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

                        <button className="btn btn-success" onClick={() => props.showOrder(3)}  > Status </button>






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


const Carving = (props) => {
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
            const response = await axios.post(/*"http://amaronsoftware.com/monumanagerapi/api/customers/addcustomer", userData*/);
            //console.log(response.data);
            setSucc(response.data);
            console.log(response.data);
        } catch (err) {
            setErr(err.response.data);
        }
    }
    //    console.log(inputs)
    return (
        <div className='carving' style={{maxWidth: "1000px", margin: "0 auto"}}>
            <h2 className='text-center my-3'>Carving</h2>
            
                
                    <div className='cardItem shadow p-3 mx-3'>
                        <form onSubmit={handleClick}>

                        <div className='carTopSection'>
                                <div className=''>
                                <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio1" value="Front" name='car_side' />
  <label className="form-check-label" htmlFor="inlineradio1">Front</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Back" name='car_side' />
  <label className="form-check-label" htmlFor="inlineradio2">Back</label>
</div>
</div>


<div className='carPosition'>
<h5 className='h4 text-center my-3'>Position</h5>
<div className='carvingPositionWrap'>

<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio1" value="Top Left" name='car_position' />  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Top Center" name='car_position' />
  
</div>
 <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio1" value="Top Right" name='car_position' />
  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Center Left" name='car_position' />
  
</div>
 <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio1" value="Center Center" name='car_position' />
  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Center Right" name='car_position' />
  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Bottom Left" name='car_position' />
  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Bottom Center" name='car_position' />
  
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineradio2" value="Bottom Right" name='car_position' />
  
</div>
</div>

</div>

                                </div>


                                    <div className='row'>
                                        <div className='col-4'>
                                            <div className="form-floating mb-3">
                                                <input type="text" value={userData["car_first_name"] || ""} name="car_first_name" className="form-control" placeholder="First Name" onChange={handleChange} required />
                                                <label htmlFor="floatingInput">First Name</label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-floating mb-3">
                                                <input type="text" value={userData["car_middle_name"]} name="car_middle_name" className="form-control" placeholder="middlename" onChange={handleChange} required />
                                                <label htmlFor="floatingInput">Middlename</label>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-floating mb-3">
                                                <input type="text" value={userData["car_last_name"]} name="car_last_name" className="form-control" placeholder="lastname" onChange={handleChange} required />
                                                <label htmlFor="floatingInput">Lastname</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-6'>
                                            <div className="form-floating mb-3">
                                                <input type="text" value={userData["car_birth_date"]} name="car_birth_date" className="form-control" placeholder="phone" onChange={handleChange} required />
                                                <label htmlFor="floatingInput">Birth Date</label>
                                            </div>
                                        </div>
                                        <div className='col-6'>

                                            <div className="form-floating mb-3">
                                                <input type="text" value={userData["car_passing_date"]} name="car_passing_date" className="form-control" placeholder="email" onChange={handleChange} required />
                                                <label htmlFor="floatingInput">Passing Date</label>
                                            </div>
                                        </div>
                                    </div>



                                    <div className='col-12'>
                                        <div className="form-floating mb-3">
                                            <textarea name="car_notes" rows="4" value={userData["car_notes"]} style={{ height: "150px" }} className="form-control" placeholder="My Beloved Love" onChange={handleChange} />
                                            <label htmlFor="floatingInput">My Beloved Love</label>
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




                                        <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" onClick={handleClick} />
                                  

                               


                            </div>
                        </form>
                    </div>
                </div>

          
    )
}

const Status = () => {
   const { userData, setUserData } = useContext(StepperContext);
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        
        //setUserData({ ...userData, [e.target.name]: e.target.value });
        setUserData({ ...userData, [name]: value });
        console.log(userData);
    };

    const [inputList, setInputList] = useState("");
    const [Items, setItems] = useState([]);

    const itemEvent = (event) => {
        setInputList(event.target.value);
    };

    const listOfItems = (e) => {
      e.preventDefault();
        setItems((oldItems) =>{
            return [...oldItems, inputList];
        });
        setInputList("");
        console.log(userData);
    }

    return (
        <>
            <div className='status'>

                <h2 className='text-center my-3'>Status</h2>

                <div className='mainDiv'>
                    <div className="mainWrapper">
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>

                            <form onSubmit={listOfItems} >

                                <div className='statusList'>
                                    <ol onChange={handleChange}>
                                   
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" name="order_status"  type="radio"  value="Stone Ordered" id='order_status1' />
                                                <label className="form-check-label" htmlFor="order_status1">
                                                    Stone Ordered
                                                </label>
                                            </div>

                                        </li>

                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" name="order_status" type="radio"  value="Stone Ready To Carve"  id='order_status2' />
                                                <label className="form-check-label" htmlFor="order_status2">
                                                    Stone Ready To Carve
                                                </label>
                                            </div>

                                        </li>


                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" name="order_status" type="radio"  value="Inside the Shop" id='order_status3' />
                                                <label className="form-check-label" htmlFor="order_status3">
                                                    Inside the Shop
                                                </label>
                                            </div>

                                        </li>


                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" name="order_status" type="radio"  value="Ready for Placement" id='order_status4' />
                                                <label className="form-check-label" htmlFor="order_status4">
                                                    Ready for Placement
                                                </label>
                                            </div>

                                        </li>
{}
                                        {Items.map((itemval,i) => {
                                            return (
                                                <>
                                                    <li>
                                                        <div className="form-check">
                                                        <input className="form-check-input" name="order_status" type="radio" value={itemval} id={`order_statusCus${i}`} />
                                                            <label className="form-check-label" htmlFor={`order_statusCus${i}`}>
                                                                {itemval} 
                                                            </label>
                                                        </div>

                                                    </li>
                                                </>
                                            )
                                        })}

                                    </ol>

                                </div>

                                <div className='row'>
                                    <div className='col-sm-10'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="phone" value={inputList}  required onChange={itemEvent} />
                                            <label htmlFor="floatingInput">Add New Status</label>
                                        </div>
                                    </div>
                                    <div className='col-sm-2'>
                                        <button type='submit' className='btn btn-primary roundButton' > + </button>
                                    </div>

                                    <Button btnDesign="btn btn-success" btnText="Save" onClick={""} />
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const OrderServices = (props) => {
    return (
        <div className='orderServices'>
            <h2 className='text-center my-3'>Order Services</h2>
            <h5 className='h5 text-center'>List of Tasks, products, carving and the rest associated with this job</h5>

            <div className='row py-4'>
                <div className='col-md-5'>

                    <div className='servicesList'>
                        <ul>
                            <li>
                                <button className='btn btn-primary btn-lg btn-ext-lg' onClick={() => props.showOrder(5)} > + Carving</button>
                            </li>
                            <li>
                                <button className='btn btn-success btn-lg btn-ext-lg' onClick={() => props.showOrder(7)}> + Task</button>
                            </li>
                            <li>
                                <button className='btn btn-info text-white btn-lg btn-ext-lg' onClick={() => props.showOrder(8)}> + Product</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='orderServicesList'>
                        <ul>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task A</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Carving 2</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Carving 1</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Product 1</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Product 2</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task B</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task C</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task A</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Carving 2</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Carving 1</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Product 1</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Product 2</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task B</span>
                            </li>
                            <li>
                                <span className='icon'><FaHome /></span> <span>Task C</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default Customer;
export { Status, Order, OrderServices, Carving, CarvingType, Task, Product }