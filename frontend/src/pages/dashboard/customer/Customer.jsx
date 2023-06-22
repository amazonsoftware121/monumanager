import './customer.scss'
import { useState, useContext, useEffect } from 'react';
import { StepperContext } from '../../../context/StepperContext';
import { FaHome, FaPlus } from 'react-icons/fa';
import dummy from "../../../images/dummy.jpg";
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Button from '../../../components/Button';
import { AuthContext } from "../../../context/authContext";
import { makeRequest } from '../../../axios';
import { useMutation, useQueryClient } from "react-query";

import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner'
import TopNav from '../../../components/TopNav';

const Customer = (props) => {
    const [userData, setUserData] = useState("");
    const [order, setOrder] = useState(false);

    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const [recentOrders, setRecentOrders] = useState("");
    const [display, setDisplay] = useState("false");
    const [urlCustomerId, setUrlCustomerId] = useState(null);
    const [alrcust, setAlrcust] = useState(null);
    const navigate = useNavigate();

    let { customerId } = useParams();



    useEffect(() => {
        if (customerId) {
            makeRequest.get("/customers/getsinglecustomer/" + customerId)
                .then(res => {
                    const data = res.data[0];
                    setUserData(data);
                })
                .catch(err => console.log(err));
        }
    }, []
    );



    const toggleDisplay = async () => {

        try {
            const response = await makeRequest.post("/jobs/recentjobs", { "customerId": customerId });
            setRecentOrders(response.data.data);
        } catch (err) {
            setErr(err.response.data);
        }

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
        if (!order) {
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
            if (!customerId) {
                const response = await makeRequest.post("/customers/addcustomer", userData);
                const ccName = `${userData?.first_name} ${!userData.middle_name ? "" : userData.middle_name} ${userData?.last_name}`;
                setSucc(ccName + " " + response.data[0].successmsg);
                console.log(response.data[0].lastInserId);
                const currcustomerId = response.data[0].lastInserId;
                setUrlCustomerId(currcustomerId);
                setUserData({ ...userData, ["currentCustomerid"]: currcustomerId });
                makeRequest.get("/customers/getsinglecustomer/" + currcustomerId)
                    .then(res => {
                        const data = res.data[0];
                        setUserData(data);
                        navigate(`/dashboard/customer/${currcustomerId}`);
                    })

            }
            else {

            }
        }

        catch (err) {
            setErr(err.response.data[0].msg);
            setAlrcust(err.response.data[0].custid);
        }
        console.log(userData);
    }


    return (
        <>

            <div className='customer'>
                {customerId ? <TopNav prevStep={`/dashboard/customers`} /> : <TopNav prevStep={`/dashboard`} />}
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
                                            <input type="text" value={userData["middle_name"] || ""} name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Middlename</label>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["last_name"] || ""} name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Lastname</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["phone"] || ""} name="phone" className="form-control" placeholder="phone" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Phone</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>

                                        <div className="form-floating mb-3">
                                            <input type="email" value={userData["email"] || ""} name="email" className="form-control" placeholder="email" onChange={handleChange} required disabled={customerId && true} />
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="address" value={userData["address"] || " "} className="form-control" style={{ height: "150px" }} placeholder="address" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Address</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" value={userData["notes"] || " "} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                </div>




                                <div className='buttonWrapper'>


                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleClick} />

                                    <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" />

                                    {!customerId && <Button btnDesign="btn btn-success" btnText="Add" btnType="submit" />}
                                </div>

                                <p className='custResponse text-danger'> {err && (<span dangerouslySetInnerHTML={{ __html: `${err} Please <a href="/dashboard/customer/${alrcust}"> click here</a> for existing customer.` }} />)}</p>

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
                                {!display ? <div className='recentOrders'>
                                    <ul>



                                        {recentOrders.length > 0 ? recentOrders.map((item, index) => {
                                            return (
                                                <li key={index}><FaHome /><Link to={`/dashboard/customer/${customerId}/order/${item.id}`} >{item.notes}</Link>{item.status ? "Status:" + item.status : ""}</li>

                                            )
                                        }) : "No Order Found"}



                                    </ul>
                                </div> : ""}

                                <div className='addOrder mt-5'>
                                    {customerId && <Link to={`/dashboard/customer/${customerId}/addorder`} className='btn btn-secondary'  > Add Order</Link>}

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
    //const { userData, setUserData } = useContext(StepperContext);
    const [userData, setUserData] = useState("");
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const [orderDetail, setOrderDetails] = useState("");
    const [jobTasks, setJobTasks] = useState([]);
    let { orderid } = useParams();
    let { customerId } = useParams();
    const navigate = useNavigate();

    /*    const { isLoading, error, data } = useQuery(['services'], () =>
            makeRequest.get("/jobs/orderservices").then(res => {
                return res.data;
            })
        );
    */

    const { isLoading, error, data } = useQuery(['jobtasks'], () => {
        if (orderid) makeRequest.get("/tasks/getjobtasks/" + orderid).then(res => {
            setJobTasks(res.data);
            return res.data;
        })
    }
    );


    useEffect(() => {
        if (orderid) {
            makeRequest.get("/jobs/getjob/" + orderid)
                .then(res => {
                    const data = res.data[0];
                    setOrderDetails(data);
                })
                .catch(err => console.log(err));
        }
        makeRequest.get("/customers/getsinglecustomer/" + customerId)
            .then(res => {
                const data = res.data[0];
                setUserData(data);
            })
            .catch(err => console.log(err));
    }
        , []
    );


    console.log(orderDetail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, "currentCustomerid": customerId, [name]: value });
    };

    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            if (!orderid) {
                const response = await makeRequest.post("/jobs/addjob", userData);
                setSucc(response.data[0].successmsg);
                console.log(response.data[0].lastInserId);
                const jobId = response.data[0].lastInserId;
                setUserData({ ...userData, ["currentjobid"]: jobId });
                navigate(`/dashboard/customer/${customerId}/order/${jobId}`);
            }
            else {

            }
        } catch (err) {
            setErr(err.response.data);
        }
    }
    return (
        <>
            <div className="order">
                <TopNav prevStep={`/dashboard/customer/${customerId}`} />
                <h2 className='text-center my-3'>Order Info</h2>

                <div className="row">
                    <div className="col-8 px-5 mt-3">

                        <div className='row'>
                            <div className="col-md-8 order_info mb-5">
                                <div className="item">
                                    <div className="rightContent">
                                        <div className="customer_info">
                                            <h6 className="title"><strong>CUSTOMER INFO </strong></h6>
                                            <p><strong>Customer Name: </strong>                                     {!userData.first_name && !userData.middle_name && !userData.last_name ? "" : `${userData.first_name}  ${!userData.middle_name ? "" : userData.middle_name} ${userData.last_name}`}
                                                <br />
                                                <strong>Phone: </strong> {userData.phone}<br />
                                                <strong>Email: </strong> {userData.email}</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className='col-md-4'>

                                {orderid ? <div> <p className='mt-3'><strong>Order Status: </strong> {orderDetail.status ? `${orderDetail.status}` : "Not Updated"} </p> <button className="btn btn-success" onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/status`)}  > Change Status </button></div> : ""}
                                <p></p>
                            </div>

                        </div>

                        <form onSubmit={handleClick}>

                            <div className=''>
                                <div className="form-floating mb-3">
                                    <textarea value={orderDetail.notes} name="order_notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                    <label htmlFor="floatingInput">Order Description</label>
                                </div>
                            </div>




                            { /*<div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="orderDueDate" className="form-label">Order Due Date</label>
                                    <input type='date' value={userData["order_due_date"] || ""} id='order_due_date' name="order_due_date" className="form-control" placeholder="notes" onChange={handleChange} />

                                </div>
                            </div>*/ }


                            <div className='d-flex justify-content-between'> <div><Button btnDesign="btn btn-success" btnText="Save" btnType="submit" /> </div> <div className="addService">
                                {orderid && <button className="btn btn-secondary" onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`)}> <FaPlus /> Add Service</button>}
                            </div>


                            </div>
                            <p className='custResponse text-danger'> {err && err}</p>

                            <p className='custResponse text-success'>{succ && succ}</p>
                        </form>




                    </div>
                    <div className="col-4 px-5 sidebar">
                        <div className='sidebar_inner'>
                            <h5>Services</h5>
                            <div className="serviceList">
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
                                        /> : jobTasks.map((jobtask) => <li key={jobtask.id}>
                                            <Link title="Edit" to={`/dashboard/customer/${customerId}/order/${orderid}/task/${jobtask.id}`} state={jobtask}> <span><FaHome /> </span> Task:  {jobtask.description}</Link>
                                        </li>))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Product = () => {
    const [productData, setProductData] = useState("");
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const [productImage, setProductImage] = useState("");
    const { customerId, orderid } = useParams();
    const navigate = useNavigate();

    let { productId } = useParams();



    useEffect(() => {
        if (productId) {
            makeRequest.get("/products/getproduct/" + productId)
                .then(res => {
                    const data = res.data[0];
                    setProductData(data);
                })
                .catch(err => console.log(err));
        }
    }, []
    );

    console.log(productData);

    const { isLoading, error, data } = useQuery(['products'], () =>
        makeRequest.get("/products/getproducts").then(res => {
            return res.data;
        })
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFile = (e) => {
        setProductImage(e.target.files[0]);
    }


    const { currentUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_description', productData["product_description"]);
        formData.append('product_color', productData["product_color"]);
        formData.append('product_size', productData["product_size"]);
        formData.append('product_qty_on_hand', productData["product_qty_on_hand"]);
        formData.append('product_price', productData["product_price"]);
        formData.append('product_options', productData["product_options"]);
        formData.append('product_notes', productData["product_notes"]);
        formData.append('product_image', productImage);
        formData.append('currentjobid', productData["currentjobid"]);

        try {
            const res = await makeRequest.post(`/products/addproduct/${orderid}`, formData);
            setSucc(res.data);
            navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='customer'>
                <TopNav prevStep={`/dashboard/customer/${customerId}/order/${orderid}/orderservices`} />
                <h2 className='text-center my-3'>Product</h2>
                <div className='row'>
                    <div className='col-md-8'>

                        <div className='cardItem shadow p-3 mx-3'>
                            <h4>Create Product</h4>
                            <form onSubmit={handleClick}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea type="text" rows="4" value={productData["product_description"] || ""} style={{ height: "112px" }} name="product_description" className="form-control" placeholder="Description" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Description</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <select className="form-select form-control" aria-label="Default select example" name='product_color' onChange={handleChange}>
                                                        <option defaultValue={"Color"}>Color</option>
                                                        <option value={productData["product_color"]} >Red</option>
                                                        <option value={productData["product_color"]}>Black</option>
                                                        <option value={productData["product_color"]}>Gray</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="text" value={productData["product_size"] || ""} name="product_size" className="form-control" placeholder="Options" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Size </label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={productData["product_qty_on_hand"] || ""} name="product_qty_on_hand" className="form-control" placeholder="phone" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Qty On Hand</label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={productData["product_price"] || ""} name="product_price" className="form-control" placeholder="email" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Price</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea value={productData["product_options"]} style={{ height: "100px" }} name="product_options" className="form-control" placeholder="Options" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Options</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea name="product_notes" rows="4" value={productData["product_notes"]} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <div className='text-center' htmlFor="product_image">
                                                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' width={200} />
                                            </div>
                                            <label htmlFor="product_image" name="product_image" className="form-label">Select Product Image</label>
                                            <input className="form-control" type="file" id="product_image" name="product_image" onChange={handleFile} />
                                        </div>
                                    </div>
                                </div>
                                <div className='buttonWrapper'>
                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleClick} />
                                    <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" />
                                    <Button btnDesign="btn btn-success" btnText="Add" btnType="submit" />
                                </div>
                                <p className='custResponse text-danger'> {err && err}</p>
                                <p className='custResponse text-success'>{succ && succ}</p>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-4 px-5 sidebar'>
                        <div className='sidebar_inner'>
                            <h5>Select Products</h5>
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
                                    /> : data.map((product) => { return (
                                        <li>
                                    <input type='checkbox' value={product.id}  /> {product.description}
                                    
                                    </li> ) }))}
                                    </ul>

</div>


                    </div>
                </div>

            </div>
        </>
    )
}



const EditProduct = () =>{

    const [productData, setProductData] = useState("");
    const [err, setErr] = useState(null);
    const [productImage, setProductImage] = useState("");
    const [succ, setSucc] = useState(null);
    const navigate = useNavigate();

    let { productid } = useParams();



    useEffect(() => {
        if (productid) {
            makeRequest.get("/products/getproduct/" + productid)
                .then(res => {
                    const data = res.data[0];
                    setProductData(data);
                })
                .catch(err => console.log(err));
        }
    }, []
    );

    console.log(productData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFile = (e) => {
        setProductImage(e.target.files[0]);
    }


    const queryClient = useQueryClient();
    const handleClick = async (e) => {
        e.preventDefault();
/*        setErr(null);
        setSucc(null);
        

        const formData = new FormData();
        formData.append('product_description', productData["product_description"]);
        formData.append('product_color', productData["product_color"]);
        formData.append('product_size', productData["product_size"]);
        formData.append('product_qty_on_hand', productData["product_qty_on_hand"]);
        formData.append('product_price', productData["product_price"]);
        formData.append('product_options', productData["product_options"]);
        formData.append('product_notes', productData["product_notes"]);
        formData.append('product_image', productImage);

        try {
            const res = await makeRequest.post(`/products/updateproduct/${productid}`, formData);
            setSucc(res.data);
            navigate(`/dashboard/products`);
        } catch (err) {
            console.log(err)
        }*/
    }
    return (
        <>
            <div className='customer'>
                
                <h2 className='text-center my-3'>Product</h2>
                <div className='row'>
                    <div className='col-md-12'>

                        <div className='cardItem shadow p-3 mx-3'>
                            <h4>Update Product</h4>
                            <form onSubmit={handleClick}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea type="text" rows="4" value={productData["product_description"] || productData.description } style={{ height: "112px" }} name="product_description" className="form-control" placeholder="Description" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Description</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <select className="form-select form-control" aria-label="Default select example" name='product_color' onChange={handleChange}>
                                                        <option defaultValue={"Color"}>Color</option>
                                                        
                                                        <option value={productData["product_color"]} selected={productData.color === "Red"} >Red</option>
                                                        <option value={productData["product_color"]} selected={productData.color === "Black"}>Black</option>
                                                        <option value={productData["product_color"]} selected={productData.color === "Gray"}>Gray</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="text" value={productData["product_size"] || productData.size=="undefined" ? "" : productData.size} name="product_size" className="form-control" placeholder="Options" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Size </label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={productData["product_qty_on_hand"] || productData.quantity_on_hand==0 ? "" : productData.quantity_on_hand} name="product_qty_on_hand" className="form-control" placeholder="phone" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Qty On Hand</label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={productData["product_price"] || productData.price==0 ? "" : productData.price} name="product_price" className="form-control" placeholder="email" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Price</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea value={productData["product_options"] || productData.options=="undefined" ? "" : productData.options} style={{ height: "100px" }} name="product_options" className="form-control" placeholder="Options" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Options</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea name="product_notes" rows="4" value={productData["product_notes"] || productData.notes=="undefined" ? "" : productData.notes} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="mb-3">
                                            <div className='text-center' htmlFor="product_image">
                                                <img src={`https://amaronsoftware.com/monumanagerapi/static/${productData.image}`} width={200} />
                                            </div>
                                            <label htmlFor="product_image" name="product_image" className="form-label">Select Product Image</label>
                                            <input className="form-control" type="file" id="product_image" name="product_image" onChange={handleFile} />
                                        </div>
                                    </div>
                                </div>
                                <div className='buttonWrapper'>
                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleClick} />
                                    <Button btnDesign="btn btn-success" btnText="Save" btnType="submit" />
                                    <Button btnDesign="btn btn-success" btnText="Add" btnType="submit" />
                                </div>
                                <p className='custResponse text-danger'> {err && err}</p>
                                <p className='custResponse text-success'>{succ && succ}</p>
                            </form>
                        </div>
                    </div>
                 
                </div>

            </div>
        </>
    )

}


const Task = () => {
    const [taskData, setTaskData] = useState("");
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const navigate = useNavigate();
    const { orderid, customerId } = useParams();
    const currentDate = new Date().toISOString().split('T')[0];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value, ["task_creation_date"]: currentDate });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(taskData);
        setErr(null);
        setSucc(null);
        try {
            const response = await makeRequest.post(`/tasks/addtask/${orderid}`, taskData);
            setSucc(response.data[0].successmsg);
            console.log(response.data);
            navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`);
        } catch (err) {
            setErr(err.response.data);
        }
    }

    return (
        <div className='task'>
            <TopNav prevStep={`/dashboard/customer/${customerId}/order/${orderid}/orderservices`} />
            <h2 className='text-center my-3'>Task</h2>
            <div className='mainDiv'>
                <div className="mainWrapper">
                    <form onSubmit={handleSubmit} >
                        <div className='row'>
                            <div className='col-8'>
                                <div className="form-floating mb-3">
                                    <textarea id='task_description' className="form-control" style={{ height: "400px" }} name='task_description' onChange={handleChange} value={taskData["task_description"] || ""} placeholder='Task Description' required />
                                    <label htmlFor="task_description">Task Description</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='form-floating mb-3'>
                                    <input id='task_notes' type='text' className='form-control' value={taskData["task_notes"] || ""} name='task_notes' onChange={handleChange} placeholder="Here's Something" />
                                    <label htmlFor="task_notes">Here's Something</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input type='date' className='form-control' value={taskData["task_creation_date"] || currentDate} name='task_creation_date' required onChange={handleChange} placeholder='Creation Date' />
                                    <label htmlFor='floatingInput'>Creation Date</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input type='date' className='form-control' value={taskData["task_due_date"] || ""} name='task_due_date' onChange={handleChange} placeholder='Due Date' />
                                    <label htmlFor='floatingInput'>Due Date</label>
                                </div>
                                <button type='submit' className='btn btn-success'>Save</button>
                                <div className='mb-3'>
                                    <p className='text-danger'><strong>{err && err}</strong></p>
                                    <p className='text-success'><strong>{succ && succ} </strong></p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


const CarvingType = () => {
    return (
        <div>CarvingType</div>
    )
}


const Carving = (props) => {
    const [carvingData, setCarvingData] = useState("");
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const { customerId, orderid } = useParams();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarvingData({ ...carvingData, [name]: value });
    };
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(carvingData);
        setErr(null);
        setSucc(null);
        try {
            const response = await makeRequest.post(`/carvings/addcarving/${orderid}`, carvingData);
            //console.log(response.data);
            setSucc(response.data);
            console.log(response);
            navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`);
        } catch (err) {
            setErr(err.response.data);
        }
    }
    return (
        <div className='carving' style={{ margin: "0 auto" }}>
            <TopNav prevStep={`/dashboard/customer/${customerId}/order/${orderid}/orderservices`} />
            <h2 className='text-center my-3'>Carving</h2>
            <div className='cardItem shadow p-3 mx-3'>
                <form onSubmit={handleClick}>
                    <div className='carTopSection'>
                        <div className='' onChange={handleChange}>
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
                            <div className='carvingPositionWrap' onChange={handleChange}>
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
                                <input type="text" value={carvingData["car_first_name"] || ""} name="car_first_name" className="form-control" placeholder="First Name" onChange={handleChange}  />
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-floating mb-3">
                                <input type="text" value={carvingData["car_middle_name"] || ""} name="car_middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                <label htmlFor="floatingInput">Middlename</label>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-floating mb-3">
                                <input type="text" value={carvingData["car_last_name"] || ""} name="car_last_name" className="form-control" placeholder="lastname" onChange={handleChange} required />
                                <label htmlFor="floatingInput">Lastname</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-floating mb-3">
                                <input type="date" value={carvingData["car_birth_date"] || ""} name="car_birth_date" className="form-control" placeholder="phone" onChange={handleChange}  />
                                <label htmlFor="floatingInput">Birth Date</label>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-floating mb-3">
                                <input type="date" value={carvingData["car_passing_date"] || ""} name="car_passing_date" className="form-control" placeholder="email" onChange={handleChange}  />
                                <label htmlFor="floatingInput">Passing Date</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-floating mb-3">
                            <textarea name="car_notes" rows="4" value={carvingData["car_notes"] || ""} style={{ height: "150px" }} className="form-control"  onChange={handleChange} />
                            <label htmlFor="floatingInput"></label>
                        </div>
                    </div>
                    <div className='buttonWrapper'>
                        <button className='btn btn-primary'>Save</button>
                        <p className='custResponse text-danger'><strong> {err && err}</strong></p>
                        <p className='custResponse text-success'><strong>{succ && succ}</strong></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Status = () => {
    const [userData, setUserData] = useState("");
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const { orderid } = useParams();
    const { customerId } = useParams();

    const navigate = useNavigate();
    const handleChange = (e) => {
        console.log(e)
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const [inputList, setInputList] = useState("");
    const [Items, setItems] = useState([]);
    const itemEvent = (event) => {
        setInputList(event.target.value);
    };
    const listOfItems = (e) => {
        e.preventDefault();
        if (inputList === "") {
            alert("Please enter new status.")
        }
        else {
            setItems((oldItems) => {
                return [...oldItems, inputList];
            });
            setInputList("");
            console.log(userData);
        }
    }
    const handleSubmit = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            const response = await makeRequest.put(`/jobs/updatejobstatus/${orderid}`, userData);
            setSucc(response.data);
            console.log(response.data);
            navigate(`/dashboard/customer/${customerId}/order/${orderid}`);
        } catch (err) {
            setErr(err.response.data);
        }

    }
    return (
        <>
            <div className='status'>
                <TopNav prevStep={`/dashboard/customer/${customerId}/order/${orderid}`} />
                <h2 className='text-center my-3'>Status</h2>
                <div className='mainDiv'>
                    <div className="mainWrapper">
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <form onSubmit={handleSubmit} >
                                    Current Status: { }
                                    <div className='statusList'>
                                        <ol onChange={handleChange}>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" name="order_status" type="radio" required value="Stone Ordered" id='order_status1' />
                                                    <label className="form-check-label" htmlFor="order_status1">
                                                        Stone Ordered
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" name="order_status" type="radio" required value="Stone Ready To Carve" id='order_status2' />
                                                    <label className="form-check-label" htmlFor="order_status2">
                                                        Stone Ready To Carve
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" name="order_status" type="radio" required value="Inside the Shop" id='order_status3' />
                                                    <label className="form-check-label" htmlFor="order_status3">
                                                        Inside the Shop
                                                    </label>
                                                </div>

                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" name="order_status" type="radio" required value="Ready for Placement" id='order_status4' />
                                                    <label className="form-check-label" htmlFor="order_status4">
                                                        Ready for Placement
                                                    </label>
                                                </div>
                                            </li>
                                            {Items.map((itemval, i) => {
                                                return (
                                                    <>
                                                        <li>
                                                            <div className="form-check">
                                                                <input className="form-check-input" name="order_status" type="radio" required value={itemval} id={`order_statusCus${i}`} />
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
                                    <input type='hidden' value={userData.currentjobid} name='currentjobid' />
                                    <div className='row'>
                                        <div className='col-sm-10'>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" placeholder="phone" value={inputList} onChange={itemEvent} />
                                                <label htmlFor="floatingInput">Add New Status</label>
                                            </div>
                                        </div>
                                        <div className='col-sm-2'>
                                            <button className='btn btn-primary roundButton' onClick={listOfItems} > + </button>
                                        </div>
                                        <Button btnDesign="btn btn-success" btnText="Save" type="submit" />
                                    </div>
                                    <div className='mt-3'> {succ}</div>
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
    const navigate = useNavigate();
    const { customerId, orderid } = useParams();
    const { isLoading, error, data } = useQuery(['carvings'], () =>
        makeRequest.get("/jobs/jobdetails/" + orderid).then(res => {
            return res.data;
        })
    );
    return (
        <div className='orderServices'>
            <TopNav prevStep={`/dashboard/customer/${customerId}/order/${orderid}`} />
            <h2 className='text-center my-3'>Order Services</h2>
            <h5 className='h5 text-center'>List of Tasks, products, carving and the rest associated with this job</h5>

            <div className='row py-4'>
                <div className='col-md-5'>

                    <div className='servicesList'>
                        <ul>
                            <li>
                                <button className='btn btn-primary btn-lg btn-ext-lg' onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/addcarving`)} > + Carving</button>
                            </li>
                            <li>
                                <button className='btn btn-success btn-lg btn-ext-lg' onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/addtask`)}> + Task</button>
                            </li>
                            <li>
                                <button className='btn btn-info text-white btn-lg btn-ext-lg' onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/addproduct`)}> + Product</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-7'>
                    <div className='orderServicesList'>
                        <div className='carvings'>
                            <h3 className=' mt-2 text-uppercase'>Details</h3>
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
                                    : data.map((jobdetail, key) =>
                                        <li key={key}> <p> <span className='icon'><FaHome /></span>
                                         <Link to={jobdetail.type == "task" ? `/dashboard/customer/${customerId}/order/${orderid}/task/${jobdetail.id}` : jobdetail.type == "product" ? `/dashboard/customer/${customerId}/order/${orderid}/product/${jobdetail.id}` : jobdetail.type == "carving" ? `/dashboard/customer/${customerId}/order/${orderid}/carving/${jobdetail.id}` : "" }>
                                         {`${jobdetail.type}: ${jobdetail.description}`}
                                         </Link>
                                          </p> </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Customer;
export { Customer, Status, Order, OrderServices, Carving, CarvingType, Task, Product, EditProduct }