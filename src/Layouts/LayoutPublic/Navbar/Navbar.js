import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <nav className="navbar public-navbar navbar-expand-sm custom-bg navbar-dark sticky-top">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" alt="Link to contact">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link" alt="Link to contact">
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin" className="nav-link" alt="Link to contact">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
