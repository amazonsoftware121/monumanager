import React from "react";
import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <>
<Link to={`login`}>Login</Link>
<Link to={`dashboard`}>Dashboard</Link>
        </>
    )
}

export default Header;