import React from "react";
import Axios from 'axios';
const formWrapper = {
    width: "360px",
}
const Login = () =>{
    return(
<div className="container mt-5">
<div className="loginPage d-flex aligns-items-center justify-content-center">
   
    <div className="formWrapper" style={formWrapper}>
    <h3>Login Page</h3>

    <form>
    <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
  <label for="floatingInput">Email address</label>
</div>
<div className="form-floating">
  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
  <label for="floatingPassword">Password</label>
</div>

<div className="d-grid gap-2 mt-3">
            <input type="submit" className="btn btn-primary" value="Login" />
              
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>

          </form>

</div>
</div>
</div>
    );
}
export default Login;