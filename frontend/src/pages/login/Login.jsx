import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import './login.scss';
import Header from "../../components/header/Header";
import PageHeader from "../../components/PageHeader";

const formWrapper = {
  width: "360px",
}
const Login = () => {
  const {login} = useContext(AuthContext);
  const handleLogin = () =>{
      login();
  }



  return (
    <>
    <Header />
    <PageHeader title="Login" />
    <div className="container mt-5">
      <div className="loginPage d-flex aligns-items-center justify-content-center">

        <div className="formWrapper" style={formWrapper}>
          <h3>Login Page</h3>

          <form>
            <div className="form-floating mb-3">
              <input type="email" name="username"  className="form-control" id="floatingInput" placeholder="name@example.com" required />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" name="password"  className="form-control" id="floatingPassword" placeholder="Password" />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="d-grid gap-2 mt-3">
             { /* <input onClick={handleLogin} type="submit" className="btn btn-primary" value="Login" /> */ }
<Link to="/dashboard" className='btn btn-primary'>Login</Link>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <Link to="/forgotpassword">password?</Link>
            </p>
          </form>

        </div>
      </div>
    </div>
    </>

  );
}
export default Login;