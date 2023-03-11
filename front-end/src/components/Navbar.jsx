import "../styles/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div style={{
            marginBottom: "5rem",

        }} className="navbar-container">
            <div className="navbar-outer-flex-item-left">
                <div className="navbar-logo">Encrypt</div>
            </div>
            <div className="navbar-flex-container navbar-outer-flex-item-center">
                <div className="navbar-flex-item  navbar-link">
                    <Link to='/login'> Login</Link>
                </div>
                <div className="navbar-flex-item  navbar-link"> <Link to='/'> Home</Link></div>
                <div className="navbar-flex-item  navbar-link"> <Link to='/signup'> Signup</Link></div>
            </div>
            <div className="navbar-flex-container navbar-outer-flex-item-right">
                <div className="navbar-flex-item navbar-logo">Get Help</div>
            </div>
        </div>
    );
};

export default Navbar;
