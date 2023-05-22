import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../../axios';
import Button from '../../../components/Button';
const AddCustomer = () => {

    const { customerData, setCustomerData } = useState({
        first_name: "",
        last_name: ""
    });
    const [err, setErr] = useState(null);
    const [succ, setSucc] = useState(null);

    
const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        /*setInputs({ ...inputs, [e.target.name]: e.target.value });*/
        setCustomerData({ ...customerData, [name]: value });

    };

    const handleClick = async (e) => {
        setErr(null);
        setSucc(null);
        e.preventDefault();
        try {
            const response = await makeRequest.post("/customers/addcustomer", customerData);
            const ccName = `${customerData?.first_name} ${!customerData.middle_name ? "" : customerData.middle_name} ${customerData?.last_name}`;
            setSucc(ccName + " " + response.data[0].successmsg);
            console.log(response.data[0].lastInserId);
            const currcustomerId = response.data[0].lastInserId;
            setCustomerData({ ...customerData, ["currentCustomerid"]: currcustomerId });
            navigate(`/dashboard/customer/${currcustomerId}`);

        } catch (err) {
            setErr(err.response.data);
        }
        console.log(customerData);
    }

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
                                       <input type="text" value={customerData["first_name"]} name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} required />
                                       <label htmlFor="floatingInput">Firstname</label>
                                   </div>
                               </div>
                               <div className='col-4'>
                                   <div className="form-floating mb-3">
                                       <input type="text" value={customerData["middle_name"] || ""} name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                                       <label htmlFor="floatingInput">Middlename</label>
                                   </div>
                               </div>
                               <div className='col-4'>
                                   <div className="form-floating mb-3">
                                       <input type="text" value={customerData["last_name"] || ""} name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} required />
                                       <label htmlFor="floatingInput">Lastname</label>
                                   </div>
                               </div>
                           </div>

                           <div className='row'>
                               <div className='col-6'>
                                   <div className="form-floating mb-3">
                                       <input type="text" value={customerData["phone"] || ""} name="phone" className="form-control" placeholder="phone" onChange={handleChange} required />
                                       <label htmlFor="floatingInput">Phone</label>
                                   </div>
                               </div>
                               <div className='col-6'>

                                   <div className="form-floating mb-3">
                                       <input type="email" value={customerData["email"] || ""} name="email" className="form-control" placeholder="email" onChange={handleChange} required />
                                       <label htmlFor="floatingInput">Email</label>
                                   </div>
                               </div>
                           </div>

                           <div className='row'>
                               <div className='col-6'>
                                   <div className="form-floating mb-3">
                                       <textarea name="address" value={customerData["address"] || " "} className="form-control" style={{ height: "150px" }} placeholder="address" onChange={handleChange} />
                                       <label htmlFor="floatingInput">Address</label>
                                   </div>
                               </div>
                               <div className='col-6'>
                                   <div className="form-floating mb-3">
                                       <textarea name="notes" rows="4" value={customerData["notes"] || " "} style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                       <label htmlFor="floatingInput">Notes</label>
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

export default AddCustomer