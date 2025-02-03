import { Link } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  isAuthenticated: boolean;
  handleLogOut: () => void;
}

const Navbar = ({ isAuthenticated, handleLogOut }: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          The Root Hub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <button onClick={handleLogOut} className="btn btn-danger">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
