import { useContext,useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import './login.scss';
import Header from "../../components/header/Header";
import PageHeader from "../../components/PageHeader";

const formWrapper = {
  width: "360px",
}
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/admin/dashboard")
    } catch (err) {
      setErr(err.response.data);
    }
  };


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
              <input type="text" name="username"  className="form-control" id="floatingInput"  placeholder="Username" onChange={handleChange}  />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input type="password" name="password"  className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChange} />
              <label htmlFor="floatingPassword">Password</label>
            </div>
{err && err}
            <div className="d-grid gap-2 mt-3">
             { /* <input onClick={handleLogin} type="submit" className="btn btn-primary" value="Login" /> */ }
<button onClick={handleLogin} className='btn btn-primary'>Login</button>
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