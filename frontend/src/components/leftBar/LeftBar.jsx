import './leftbar.scss'
import { Link } from 'react-router-dom'
import { FaUserAlt,FaDatabase,FaTasks } from 'react-icons/fa';
import { AiFillDashboard } from "react-icons/ai";
import { MdEngineering } from "react-icons/md";

const LeftBar = () => {
  return (
    <>

        <div className="leftBar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">

                    <li>
                        <Link to="/dashboard" className="nav-link px-0 align-middle">
                        <AiFillDashboard />  <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                        
                    </li>
                    <li>
                        <Link to="#" className="nav-link px-0 align-middle ">
                        <FaUserAlt /> <span className="ms-1 d-none d-sm-inline">Customers</span></Link>
                        
                        
                    </li>
                    <li>
                        <Link to="#" className="nav-link px-0 align-middle">
                            <FaTasks /> <span className="ms-1 d-none d-sm-inline">Jobs</span></Link>
                    </li>
                    
                    <li>
                        <Link to="#"  className="nav-link px-0 align-middle">
                           <FaDatabase /> <span className="ms-1 d-none d-sm-inline">Products</span> </Link>
                           
                    </li>

                    <li>
                        <Link to="#" className="nav-link px-0 align-middle">
                          <FaTasks /> <span className="ms-1 d-none d-sm-inline">Task</span> </Link>
                           
                    </li>

                    <li>
                        <Link to="#" className="nav-link px-0 align-middle">
                           <MdEngineering /> <span className="ms-1 d-none d-sm-inline">Carving</span> </Link>
                           
                    </li>
                  
                </ul>
                <hr />
                
            </div>
        </div>
       
    
    </>
  )
}

export default LeftBar