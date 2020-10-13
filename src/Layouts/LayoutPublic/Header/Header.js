import React from "react";
import "./Header.scss";
import Logo from "../../../assets/img/logos/gamezonia.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div class="public-header container-fluid bg-dark navbar-dark">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img className="logotype" src={Logo} alt="Logo Gamezonia" />
        </div>
        <div>
          <p>juanjose@menacosta.website</p>
        </div>
        <div className="d-flex flex-row-reverse">
          <NavLink className="nav-link active" to="/">
            Active Link
          </NavLink>
          <NavLink className="nav-link" to="#">
            Nav Link
          </NavLink>
          <a className="nav-link disabled" to="#">
            Disabled link
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
