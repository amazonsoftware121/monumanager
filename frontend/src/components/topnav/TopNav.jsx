import { Link } from 'react-router-dom';
import "./topnav.scss";
import { FaArrowLeft,FaRegWindowClose } from 'react-icons/fa';


const TopNav = (props) => {
  return (
    <div className="topNav"><div className="prev"><Link to={props.navLink}><FaArrowLeft style={{fontSize:"28px"}} /></Link></div> <div className="close"><FaRegWindowClose style={{fontSize:"28px"}} /></div></div>
  )
}

export default TopNav