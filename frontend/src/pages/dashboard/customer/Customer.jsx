import './customer.scss'
import { useState,useContext } from 'react';
import {StepperContext} from '../../../context/StepperContext';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
const Customer = () => {
    const {userData, setUserData} = useContext(StepperContext);
    const[order,setOrder] = useState(false);

    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);


    const [display, setDisplay] = useState("false");

const toggleDisplay = () =>{
    if(!display){
        setDisplay(true);
    }
    else{
        setDisplay(false);
    }
}
   

    const handleChange = (e) => {
        const {name, value } = e.target;
        /*setInputs({ ...inputs, [e.target.name]: e.target.value });*/
        setUserData({...userData, [name] : value });
    };

    const handleOnChange = () =>{
        if(!false){
            setOrder(true);
        }
        else{
            setOrder(false);
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
           const response =  await axios.post("http://localhost:4500/api/customers/addcustomer", userData);
           //console.log(response.data);
           setSucc(response.data);
           console.log(response.data);
        } catch (err) {
            setErr(err.response.data);
        }
    }
    //    console.log(inputs)
    console.log(err)
    return (
        <>
            <div className='customer'>
                <h2 className='text-center my-3'>Customer</h2>
                <div className='row'>
                    <div className='col-7'>
                        <div className='cardItem shadow p-3 mx-3'>
                            <form>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["first_name"] || "" } name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Firstname</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["middle_name"]} name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Middlename</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["last_name"]} name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Lastname</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["phone"]} name="phone" className="form-control" placeholder="phone" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Phone</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>

                                        <div className="form-floating mb-3">
                                            <input type="email" value={userData["email"]} name="email" className="form-control" placeholder="email" onChange={handleChange} />
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
                                    <button className='btn btn-primary' onClick={handleClick}>Archive</button>
                                    <button className='btn btn-success' onClick={handleClick}>Save</button>
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
                                        <label className="form-check-label" htmlfor="flexSwitchCheckDefault"><strong>Show Recent Orders</strong></label>
                                    </div>
                                </div>

                                <div className='recentOrders' style={display ? {display:"none"} : {display:"block"} } >
                                    <ul>
                                        <li><span><FaHome /></span> Order 001</li>
                                        <li><span><FaHome /></span> One-fine Order 002</li>
                                        <li><span><FaHome /></span> Order 003</li>
                                    </ul>
                                </div>

                                <div className='addOrder mt-5'>
                                   <button onClick={displayStep[3]} className='btn btn-secondary' >Add Order</button> 
                                </div>




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Customer