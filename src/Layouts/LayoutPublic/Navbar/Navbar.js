import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/authActions";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleDropdownCollapsed = () =>
    setIsDropdownCollapsed(!isDropdownCollapsed);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar public-navbar navbar-expand-sm custom-bg navbar-dark sticky-top">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarSupportedContent"
      >
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
        </ul>

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {!auth.authenticated ? (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" alt="Link to login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  alt="Link to register"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              {auth.user.role === "ADMIN" && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link" alt="Link to contact">
                    Admin
                  </Link>
                </li>
              )}
              <li
                className="nav-item dropdown"
                onClick={handleDropdownCollapsed}
              >
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isDropdownCollapsed ? true : false}
                >
                  {`Wellcome, ${auth.user.name}`}
                </Link>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    !isDropdownCollapsed ? "show" : ""
                  }`}
                  aria-labelledby="navbarDropdown"
                >
                  <a className="dropdown-item" href="/">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/">
                    Settings
                  </a>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </button>
                </div>
              </li>
              )
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
