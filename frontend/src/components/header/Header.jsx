import logo from '../../logo__white.png'
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';


const Header = () =>{
    return(
        <>
<nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand me-lg-5 me-0" to="/">
                    <img src={logo} className="logo-image img-fluid" alt="Monument Manager" />
                </Link>

              {/*  <form action="#" method="get" className="custom-form search-form flex-fill me-3" role="search">
                    <div className="input-group input-group-lg">
                        <input name="search" type="search" className="form-control" id="search" placeholder="Search Monu" aria-label="Search" />

                        <button type="submit" className="form-control" id="submit">
                        <FaSearch />
                        </button>
                    </div>
                </form>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}

                <div className="" id="navbarNav">
                    {/*<ul className="navbar-nav ms-lg-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">Services</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="#">Contact</Link>
                        </li> 
                    </ul>*/}

                    <div className="ms-4">
                        <Link to="/login" className="btn custom-btn custom-border-btn smoothscroll">Login</Link>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Header;