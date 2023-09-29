import './customer.scss'
import { useState, useContext, useEffect } from 'react';
import { StepperContext } from '../../../context/StepperContext';
import { FaHome, FaPlus } from 'react-icons/fa';
import dummy from "../../../images/dummy.jpg";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import Button from '../../../components/Button';
import { AuthContext } from "../../../context/authContext";
import { makeRequest } from '../../../axios';
import { useMutation, useQueryClient } from "react-query";
import PageTitle from '../../../components/PageTitle';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner'
import TopNav from '../../../components/TopNav';

const Customer = (props) => {
    const [userData, setUserData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    });
    const [order, setOrder] = useState(false);

    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    const [recentOrders, setRecentOrders] = useState("");
    const [display, setDisplay] = useState(true);
    const [urlCustomerId, setUrlCustomerId] = useState(null);
    const [alrcust, setAlrcust] = useState(null);
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState(false);
    let { customerId } = useParams();



    useEffect(() => {
        if (customerId) {
            setIsEditMode(true);
            
            // Fetch customer data
            makeRequest.get("/customers/getsinglecustomer/" + customerId)
                .then(res => {
                    const data = res.data[0];
                    console.log(data);
                    setUserData({
                        first_name: data.first_name,
                        middle_name: data.middle_name,
                        last_name: data.last_name,
                        phone: data.phone,
                        email: data.email,
                        address: data.address,
                        notes: data.notes
                    });
                })
                .catch(err => console.log(err));
    
            // Fetch recent orders
            makeRequest.post("/jobs/recentjobs", { customerId: customerId })
                .then(response => {
                    setRecentOrders(response.data.data); // Set recentOrders with the fetched data
                })
                .catch(err => console.log(err));
        }
    }, [customerId]);
    



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
        if (!order) {
            setOrder(true);
        }
        else {
            setOrder(false);
        }


    }

    const handleSubmit = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            if (isEditMode) {


                const response = await makeRequest.put(`/customers/editcustomer/${customerId}`, userData);
                const ccName = `${userData?.first_name} ${!userData.middle_name ? "" : userData.middle_name} ${userData?.last_name}`;
                setSucc(ccName + " Updated");
            }
            else {

                const response = await makeRequest.post("/customers/addcustomer", userData);
                const ccName = `${userData?.first_name} ${!userData.middle_name ? "" : userData.middle_name} ${userData?.last_name}`;
                setSucc(ccName + " " + response.data[0].successmsg);
                console.log(response.data[0].lastInserId);
                customerId = response.data[0].lastInserId;
                setUrlCustomerId(customerId);
                setUserData({ ...userData, ["currentCustomerid"]: customerId });
                makeRequest.get("/customers/getsinglecustomer/" + customerId)
                    .then(res => {
                        const data = res.data[0];
                        setUserData(data);
                        navigate(`/dashboard/customers/`);
                    })

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
                <TopNav prevStep={-1} />
                <h2 className='text-center my-3'>Customer</h2>
                <div className='row'>
                    <div className='col-7'>
                        <div className='cardItem shadow p-3 mx-3'>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-floating mb-3">
                                            <input type="text" value={userData["first_name"]} name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} />
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
                                            <input type="email" value={userData["email"]} name="email" className="form-control" placeholder="email" onChange={handleChange} disabled={customerId && true} />
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
                                            <textarea name="notes" rows="4" value={userData["notes"]} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>
                                </div>




                                <div className='buttonWrapper'>


                                    <Button btnDesign="btn btn-primary" btnText="Archive" onClick={handleSubmit} />

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
                                        <input onClick={toggleDisplay} className="form-check-input" type="checkbox"  checked={display} id="flexSwitchCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><strong>Show Recent Orders</strong></label>
                                    </div>
                                </div>
                                {display ? <div className='recentOrders'>
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
    const [orderDetails, setOrderDetails] = useState({
        status: "",
        notes: ""
    });
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
            makeRequest.get(`/jobs/getjob/${orderid}`)
                .then(res => {
                    const data = res.data[0];
                    setOrderDetails({
                        status: data.status,
                        notes: data.notes
                    });
                })
                .catch(err => console.log(err));
        }
        if(customerId != "null"){
        makeRequest.get("/customers/getsinglecustomer/" + customerId)
            .then(res => {
                const data = res.data[0];
                setUserData(data);
            })
            .catch(err => console.log(err));
        }
    }
        , []
    );


    console.log(orderDetails);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, "currentCustomerid": customerId, [name]: value });
        setOrderDetails({...orderDetails, [name]: value})
    };

    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            if (orderid) {
                const response = await makeRequest.put(`/jobs/updatejob/${orderid}`, orderDetails);
                setSucc("Job Updated");
            }
            else {
                const response = await makeRequest.post("/jobs/addjob", userData);
                setSucc(response.data[0].successmsg);
                console.log(response.data[0].lastInserId);
                const jobId = response.data[0].lastInserId;
                setUserData({ ...userData, ["currentjobid"]: jobId });
                navigate(`/dashboard/customer/${customerId}/order/${jobId}`);
            }
        } catch (err) {
            setErr(err.response.data);
        }
    }
    return (
        <>
            <div className="order">
                <TopNav prevStep={-1} />
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

                                {orderid ? <div> <p className='mt-3'><strong>Order Status: </strong> {orderDetails.status ? `${orderDetails.status}` : "Not Updated"} </p> <button className="btn btn-success" onClick={() => navigate(`/dashboard/customer/${customerId}/order/${orderid}/status`)}  > Change Status </button></div> : ""}
                                <p></p>
                            </div>

                        </div>

                        <form onSubmit={handleClick}>

                            <div className=''>
                                <div className="form-floating mb-3">
                                    <textarea value={ orderDetails.notes } name="notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                    <label htmlFor="floatingInput">Order Description</label>
                                </div>
                            </div>




                            { /*<div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="orderDueDate" className="form-label">Order Due Date</label>
                                    <input type='date' value={userData["order_due_date"]} id='order_due_date' name="order_due_date" className="form-control" placeholder="notes" onChange={handleChange} />

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
                                            <Link title="Edit" to={`/dashboard/task/edit/${jobtask.id}`} state={jobtask}> <span><FaHome /> </span> Task:  {jobtask.description}</Link>
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

const Product = ({ onClose, onUpdate }) => {
    const { customerId, orderid } = useParams();
    console.log(orderid);
    const [formData, setFormData] = useState({
        orderid: orderid || 0,
        description: '',
        color: '', // Initialize with an empty string
        size: '',
        quantity_on_hand: '',
        price: '',
        options: '',
        notes: '',
        image: null
    });

    const [isEditing, setIsEditing] = useState(false);

    /*Not use start*/
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);
    //const [productproduct_Image, setProductImage] = useState("");
    const navigate = useNavigate();
    let { productId } = useParams();
    /*Not use End*/
    useEffect(() => {
        if (productId) {
            setIsEditing(true);
            const fetchData = async () => {
                try {
                    const response = await makeRequest.get(`/products/getproduct/${productId}`);
                    setFormData(...response.data);
                }
                catch (error) {
                    console.error('Error fetching data: ' + error.message);
                }
            };
            fetchData();
        } else {
            setIsEditing(false);
        }
    }, [productId]);

    console.log(formData);



    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {

        setErr(null);
        setSucc(null);

        e.preventDefault();

        if (formData.image === null) {
            setFormData((prevData) => ({
              ...prevData,
              image: formData.image, // Keep the existing image
            }));
          }

        const dataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            dataToSend.append(key, value);
        });
        console.log(dataToSend);
        try {
            if (isEditing) {
                await makeRequest.put(`/products/updateproduct/${productId}`, dataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setSucc("Product Update Successfully");
                alert('Product Update Successfully');
                setTimeout(() => {
                    navigate(-1);
                }, 1500); // 3000 milliseconds (3 seconds)

                onUpdate();
            } else {
                await makeRequest.post(`/products/addproduct`, dataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                setSucc("Product Added Successfully");
                alert('Product added successfully');
                setTimeout(() => {
                    navigate(-1);
                }, 1500); // 3000 milliseconds (3 seconds)



            }

            onClose();
        } catch (error) {
            console.error('Error submitting data: ' + error.message);
        }
    }


    const { isLoading, error, data } = useQuery(['products'], () =>
        makeRequest.get("/products/getproducts").then(res => {
            return res.data;
        })
    );



    return (
        <>
            <div className='customer'>
                <TopNav prevStep={-1} />
                <h2 className='text-center my-3'>Product</h2>
                <div className='row'>
                    <div className='col-md-8'>

                        <div className='cardItem shadow p-3 mx-3'>
                            <h4>Create Product</h4>
                            <form onSubmit={handleSubmit}>
                                <input type='hidden' value={formData.orderid ? orderid : null} name='orderid' />
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea type="text" rows="4" value={[formData.description]} style={{ height: "112px" }} name="description" className="form-control" placeholder="Description" onChange={handleChange} required />
                                            <label htmlFor="floatingInput">Description</label>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='row'>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <select className="form-select form-control" value={formData.color} aria-label="Default select example" name='color' onChange={handleChange}>
                                                        <option value="">Select Color</option>
                                                        <option value="Red" >Red</option>
                                                        <option value="Black">Black</option>
                                                        <option value="Gray">Gray</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="text" value={formData.size} name="size" className="form-control" placeholder="Options" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Size </label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={formData.quantity_on_hand} name="quantity_on_hand" className="form-control" placeholder="phone" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Qty On Hand</label>
                                                </div>
                                            </div>
                                            <div className='col-6'>
                                                <div className="form-floating mb-3">
                                                    <input type="number" value={formData.price} name="price" className="form-control" placeholder="email" onChange={handleChange} />
                                                    <label htmlFor="floatingInput">Price</label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-floating mb-3">
                                            <textarea value={formData.options} style={{ height: "100px" }} name="options" className="form-control" placeholder="Options" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Options</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" value={formData.notes} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>


                                    <div className='col-6'>
                                        <div className="mb-3">
                                            {formData.image ? <div className='text-center' htmlFor="image"> <img src={`http://granitx.com:3000/monumanagerapi/static/${formData.image}`} width={200} /> </div> : <div className='text-center' htmlFor="image">
                                                <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg' width={200} />
                                            </div>}



                                            <label htmlFor="image" name="image" className="form-label" >Select Product Image</label>
                                            <input className="form-control" type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className='buttonWrapper'>

                                    <Button btnDesign="btn btn-success" btnText={isEditing ? 'Update' : 'Add'} btnType="submit" />

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
                                    /> : data.map((product) => {
                                        return (
                                            <li>
                                                <input type='checkbox' value={product.id} /> {product.description}

                                            </li>)
                                    }))}
                            </ul>

                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}












const Task = () => {
    const { customerId, orderid, taskId } = useParams();
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState({
        task_description: '',
        task_notes: '',
        task_creation_date: new Date().toISOString().split('T')[0],
        task_due_date: new Date().toISOString().split('T')[0],
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Simulated API request to fetch task data for editing
    useEffect(() => {
        if (taskId) {
            setIsEditMode(true);
            // Replace this with your actual API URL for editing
            makeRequest.get(`/tasks/gettask/${taskId}`)
                .then((res) => {
                    const data = res.data[0];
                    setTaskData({
                        task_description: data.description,
                        task_notes: data.notes,
                        task_creation_date: (data.creation_time).split('T')[0], // Convert to Date object
                        task_due_date: data.due_date ? data.due_date.split('T')[0] : "", // Format due_date, handle null
                    });
                    console.log(data);
                })
                .catch((err) => {
                    console.error('Error fetching task data:', err);
                    setError('An error occurred while fetching task data for editing.');
                });
        }
    }, [taskId, makeRequest, setIsEditMode, setTaskData, setError]);






    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
        console.log(taskData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            if (isEditMode) {
                // Update an existing task
                const response = await makeRequest.put(`/tasks/edittask/${taskId}`, taskData);
                if (response.status === 200) {
                    setSuccessMessage('Task updated successfully.');
                    navigate(`/dashboard/tasks`);
                    console.log("Updated");
                } else {
                    setError('Failed to update the task.');
                }
            } else {
                if (orderid) {
                    // Add a new task
                    const response = await makeRequest.post(`/tasks/addtask/${orderid}`, taskData);
                    if (response.status === 200) {
                        setSuccessMessage('Task added successfully.');
                        navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`);
                    } else {
                        setError('Failed to add the task.');
                    }
                }
                else {
                    // Add a new task
                    const response = await makeRequest.post(`/tasks/addtask`, taskData);
                    if (response.status === 200) {
                        setSuccessMessage('Task added successfully.');
                    } else {
                        setError('Failed to add the task.');
                    }
                }
            }
        } catch (err) {
            setError('An error occurred while saving the task.');
        }
    };


    return (
        <div className='task'>
            <TopNav prevStep={-1} />
            <h2 className='text-center my-3'>{ }</h2>

            <PageTitle title={isEditMode ? 'Edit Task' : 'Add Task'} />

            <div className='mainDiv'>
                <div className='mainWrapper'>
                    <form onSubmit={handleSubmit}>
                        {/* Wrap your form fields in a <form> element */}
                        <div className='row'>
                            <div className='col-8'>
                                <div className='form-floating mb-3'>
                                    <textarea
                                        id='task_description'
                                        className='form-control'
                                        style={{ height: '400px' }}
                                        name='task_description'
                                        onChange={handleChange}
                                        value={taskData.task_description || ""}
                                        placeholder='Task Description'
                                        required
                                    />
                                    <label htmlFor='task_description'>Task Description</label>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='form-floating mb-3'>
                                    <input
                                        id='task_notes'
                                        type='text'
                                        className='form-control'
                                        value={taskData.task_notes || ""}
                                        name='task_notes'
                                        onChange={handleChange}
                                        placeholder="Notes"
                                    />
                                    <label htmlFor='task_notes'>Notes</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={taskData.task_creation_date}
                                        name='task_creation_date'
                                        required
                                        onChange={handleChange}
                                    />
                                    <label htmlFor='task_creation_date'>Creation Date</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={taskData.task_due_date}
                                        name='task_due_date'
                                        onChange={handleChange}
                                    />
                                    <label htmlFor='task_due_date'>Due Date</label>
                                </div>
                                <button type='submit' className='btn btn-primary'>
                                    {isEditMode ? 'Update' : 'Save'}
                                </button>
                                <div className='mb-3'>
                                    {error && <p className='text-danger'>{error}</p>}
                                    {successMessage && <p className='text-success'>{successMessage}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};








const CarvingType = () => {
    return (
        <div>CarvingType</div>
    )
}


const Carving = (props) => {
    const { customerId, orderid, carvingId } = useParams();
    const navigate = useNavigate();

    const [carvingData, setCarvingData] = useState([{
        car_side: '',
        car_position: '',
        car_first_name: '',
        car_middle_name: '',
        car_last_name: '',
        car_birth_date: '',
        car_passing_date: '',
        car_notes: ''
    }]);
    const [err, setErr] = useState(null);
    const [error, setError] = useState(null);
    const [succ, setSucc] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        if (carvingId) {
            setIsEditMode(true);
            // Replace this with your actual API URL for editing
            makeRequest.get(`/carvings/getcarving/${carvingId}`)
                .then((res) => {
                    const data = res.data[0];
                    setCarvingData({
                        car_side: data.side == null ? "" : data.side,
                        car_position: data.position == null ? "" : data.position,
                        car_first_name: data.first_name == null ? "" : data.first_name,
                        car_middle_name: data.middle_name == null ? "" : data.middle_name,
                        car_last_name: data.last_name == null ? "" : data.last_name,
                        car_birth_date: data.passing_date == null ? null : data.birth_date.split('T')[0],
                        car_passing_date: data.passing_date == null ? null : data.passing_date.split('T')[0],
                        car_notes: data.other_details
                    });
                    console.log(data);
                })
                .catch((err) => {
                    console.error('Error fetching Carving data:', err);
                    setError('An error occurred while fetching Carving data for editing.');
                });
        }
    }, [carvingId, makeRequest, setIsEditMode, setCarvingData, setError]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarvingData({ ...carvingData, [name]: value });

        console.log(carvingData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        setErr(null);
        setSucc(null);

        try {
            if (isEditMode) {
                // Update an existing task
                const response = await makeRequest.put(`/carvings/editcarving/${carvingId}`, carvingData);
                if (response.status === 200) {
                    setSuccessMessage('Carving updated successfully.');
                    navigate(`/dashboard/carvings`);
                    console.log("Updated");
                } else {
                    setError('Failed to update the Carving.');
                }
            } else {
                if (orderid) {

                    const response = await makeRequest.post(`/carvings/addcarving/${orderid}`, carvingData);
                    //console.log(response.data);

                    console.log(response);
                    navigate(`/dashboard/customer/${customerId}/order/${orderid}/orderservices`);
                }
                else {
                    const response = await makeRequest.post(`/carvings/addcarving/`, carvingData);
                    //console.log(response.data);

                    console.log(response);
                    navigate(-1);

                }
            }
        }
        catch (err) {
            setErr(err.response.data);
        }
    }
    return (
        <div className='carving' style={{ margin: "0 auto" }}>
            <TopNav prevStep={-1} />
            <h2 className='text-center my-3'>{isEditMode ? 'Edit Carving' : 'Add Carving'}</h2>
            <div className='cardItem shadow p-3 mx-3'>
                <form onSubmit={handleSubmit}>
                    <div className='carTopSection'>
                        <div className='' >
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineradio1" value="Front" checked={carvingData["car_side"] === "Front"} name='car_side' onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inlineradio1">Front</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineradio2" value="Back" name='car_side' checked={carvingData["car_side"] === "Back"} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="inlineradio2">Back</label>
                            </div>
                        </div>
                        <div className='carPosition'>
                            <h5 className='h4 text-center my-3'>Position</h5>
                            <div className='carvingPositionWrap' >
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio1" value="Top Left" name='car_position' checked={carvingData["car_position"] === "Top Left"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio2" value="Top Center" name='car_position' checked={carvingData["car_position"] === "Top Center"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio3" value="Top Right" name='car_position' checked={carvingData["car_position"] === "Top Right"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio4" value="Center Left" name='car_position' checked={carvingData["car_position"] === "Center Left"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio5" value="Center Center" name='car_position' checked={carvingData["car_position"] === "Center Center"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio6" value="Center Right" name='car_position' checked={carvingData["car_position"] === "Center Right"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio7" value="Bottom Left" name='car_position' checked={carvingData["car_position"] === "Bottom Left"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio8" value="Bottom Center" name='car_position' checked={carvingData["car_position"] === "Bottom Center"} onChange={handleChange} />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" id="inlineradio9" value="Bottom Right" name='car_position' checked={carvingData["car_position"] === "Bottom Right"} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-4'>
                            <div className="form-floating mb-3">
                                <input type="text" value={carvingData["car_first_name"]} name="car_first_name" className="form-control" placeholder="First Name" onChange={handleChange} />
                                <label htmlFor="floatingInput">First Name</label>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-floating mb-3">
                                <input type="text" value={carvingData["car_middle_name"]} name="car_middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                <label htmlFor="floatingInput">Middlename</label>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-floating mb-3">
                                <input type="text" value={carvingData["car_last_name"]} name="car_last_name" className="form-control" placeholder="lastname" onChange={handleChange} />
                                <label htmlFor="floatingInput">Lastname</label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="form-floating mb-3">
                                <input type="date" value={carvingData["car_birth_date"]} name="car_birth_date" className="form-control" placeholder="phone" onChange={handleChange} />
                                <label htmlFor="floatingInput">Birth Date</label>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-floating mb-3">
                                <input type="date" value={carvingData["car_passing_date"]} name="car_passing_date" className="form-control" placeholder="email" onChange={handleChange} />
                                <label htmlFor="floatingInput">Passing Date</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-floating mb-3">
                            <textarea name="car_notes" rows="4" value={carvingData["car_notes"]} style={{ height: "150px" }} className="form-control" onChange={handleChange} />
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
                                    /> : data && data.map((jobdetail, key) =>
                                        <li key={key}> <p> <span className='icon'><FaHome /></span>
                                            <Link to={jobdetail.type == "task" ? `/dashboard/task/edit/${jobdetail.id}` : jobdetail.type == "product" ? `/dashboard/product/edit/${jobdetail.id}` : jobdetail.type == "carving" ? `/dashboard/carving/edit/${jobdetail.id}` : ""}>
                                                {jobdetail.type == "carving" ? `${jobdetail.type}: ${jobdetail.description == null ? "Not Updated" : ""}` : jobdetail.type == "task" ? `${jobdetail.type}: ${jobdetail.description}` : ""}
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
export { Customer, Status, Order, OrderServices, Carving, CarvingType, Task, Product, }