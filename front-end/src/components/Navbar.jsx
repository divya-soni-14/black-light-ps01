import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-outer-flex-item-left">
                <div className="navbar-logo">Encrypt</div>
            </div>
            <div className="navbar-outer-flex-item-right">
                <div className="navbar-link">Sign Up</div>
                <div className="navbar-link">Log In</div>
            </div>
        </div>
    );
};

export default Navbar;