import "./order.scss";
import { useState } from "react";
import TopNav from "../../../components/topnav/TopNav";
const Order = () => {
  const [textInput, setTextInput] = useState("");
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
<TopNav navLink="/dashboard/customer" />
    
    <div className="row">
      <div className="col-7">
<form onSubmit={onSubmits}>

<div className=''>
                                        <div className="form-floating mb-3">
                                            <textarea name="notes" rows="4" style={{ height: "150px" }} className="form-control" placeholder="notes" onChange={handleChange} />
                                            <label htmlFor="floatingInput">Notes</label>
                                        </div>
                                    </div>


<button className="btn btn-primary" type="submit">Submit</button>
</form>
      </div>

      <div className="col-5">
        
      </div>
    </div>



    </div>
    </>
  )
}

export default Order