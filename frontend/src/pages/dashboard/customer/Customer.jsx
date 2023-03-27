import './customer.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
const Customer = () => {
    const [inputs, setInputs] = useState(
        {
            first_name: "",
            middle_name: "",
            last_name: "",
            phone: "",
            email: "",
            address: "",
            notes: ""
        }
    );

    const[order,setOrder] = useState(false);

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            await axios.post("http://localhost:4500/api/customers/addcustomer", inputs)
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
                                            <input type="text" name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Firstname</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Middlename</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Lastname</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <input type="text" name="phone" className="form-control" placeholder="phone" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Phone</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>

                                        <div className="form-floating mb-3">
                                            <input type="email" name="email" className="form-control" placeholder="email" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="address" className="form-control" style={{ height: "150px" }} placeholder="address" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Address</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                </div>
                                {err && err}

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
                                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleOnChange} />
                                        <label className="form-check-label" for="flexSwitchCheckDefault"><strong>Show Recent Orders</strong></label>
                                    </div>
                                </div>

                                <div className='recentOrders'>
                                    <ul>
                                        <li><span><FaHome /></span> Order 001</li>
                                        <li><span><FaHome /></span> One-fine Order 002</li>
                                        <li><span><FaHome /></span> Order 003</li>
                                    </ul>
                                </div>

                                <div className='addOrder'>
                                    <Link to="/dashboard/order" ><button className='btn btn-secondary' >Add Order</button> </Link>
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