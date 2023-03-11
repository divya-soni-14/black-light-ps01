import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-outer-flex-item-left">
        <div className="navbar-logo">Encrypt</div>
      </div>
      <div className="navbar-flex-container navbar-outer-flex-item-center">
        <div className="navbar-flex-item  navbar-link">Encrypt</div>
        <div className="navbar-flex-item  navbar-link">Encrypt</div>
        <div className="navbar-flex-item  navbar-link">Encrypt</div>
      </div>
      <div className="navbar-flex-container navbar-outer-flex-item-right">
        <div className="navbar-flex-item navbar-logo">Encrypt</div>
      </div>
    </div>
  );
};

export default Navbar;
