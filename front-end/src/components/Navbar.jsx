import "../styles/Navbar.css";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom"
const cookies = new Cookies();
const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-outer-flex-item-left">
                <Link to="/">
                    <div className="navbar-logo accent-color">Encrypt</div>
                </Link>
            </div>
            <div className="navbar-outer-flex-item-right">
                <div className="navbar-link"><Link to='/signup'>Sign Up</Link></div>
                <div className="navbar-link"><Link to="/login">Log In</Link></div>  
            </div>
        </div >
    );
};

export default Navbar;