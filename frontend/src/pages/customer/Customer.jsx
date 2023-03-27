import './customer.scss'
import { useState } from 'react';
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

    const [err,setErr] =useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4500/api/auth/register", inputs)
        } catch (err) {
setErr(err.response.data);
        }
    }
//    console.log(inputs)
console.log(err) 
return (
        <>
            <div className='customer'>
                <h1>Customer</h1>
                <form>
                    <div className="form-floating mb-3">
                        <input type="text" name="first_name" className="form-control" placeholder="firstname" onChange={handleChange} />
                        <label htmlFor="floatingInput">firstname</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" name="middle_name" className="form-control" placeholder="middlename" onChange={handleChange} />
                        <label htmlFor="floatingInput">middlename</label>
                    </div>


                    <div className="form-floating mb-3">
                        <input type="text" name="last_name" className="form-control" placeholder="lastname" onChange={handleChange} />
                        <label htmlFor="floatingInput">lastname</label>
                    </div>


                    <div className="form-floating mb-3">
                        <input type="text" name="phone" className="form-control" placeholder="phone" onChange={handleChange} />
                        <label htmlFor="floatingInput">phone</label>
                    </div>


                    <div className="form-floating mb-3">
                        <input type="email" name="email" className="form-control" placeholder="email" onChange={handleChange} />
                        <label htmlFor="floatingInput">email</label>
                    </div>


                    <div className="form-floating mb-3">
                        <textarea name="address" className="form-control" placeholder="address" onChange={handleChange} />
                        <label htmlFor="floatingInput">address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea name="notes" className="form-control" placeholder="notes" onChange={handleChange} />
                        <label htmlFor="floatingInput">notes</label>
                    </div>

{err && err}
                    <button className='btn btn-success' onClick={handleClick}>Add Customer</button>

                </form>
            </div>
        </>
    )
}

export default Customer