import React, { useState } from "react";
import Axios from 'axios';
const formWrapper = {
  width: "360px",
}
const Login = () => {
  //const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  //const [registerStatus, setRegisterStatus] = useState("");

const login = (e) =>{
e.preventDefault();
Axios.post("http://localhost:3001/login",{
  username: username,
  password: password,
}).then((response)=>{
  if(response.data.message){
    setLoginStatus(response.data.message);
  }else{
    setLoginStatus(response.data[0].email)
  }
})
}
  return (
    <div className="container mt-5">
      <div className="loginPage d-flex aligns-items-center justify-content-center">

        <div className="formWrapper" style={formWrapper}>
          <h3>Login Page</h3>

          <form>
            <div className="form-floating mb-3">
              <input type="email" name="username" onChange={(e) => {setUsername(e.target.value)}} className="form-control" id="floatingInput" placeholder="name@example.com" required />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} className="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div>

            <div className="d-grid gap-2 mt-3">
              <input type="submit" onClick={login} className="btn btn-primary" value="Login" />

            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
<h1 style={{color: 'red',fontSize: '15px', textAlign: 'center',marginTop: '20px'}}>{loginStatus}</h1>
          </form>

        </div>
      </div>
    </div>
  );
}
export default Login;