import React from "react";
import { Link } from "react-router-dom";
import icons from "../../../assets/icons";
import "./Sidebar.scss";
const Sidebar = ({ showSidebar }) => {
  return (
    <>
      {showSidebar && (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Start Bootstrap </div>
          <div className="list-group list-group-flush">
            <Link
              to="/admin"
              className="list-group-item list-group-item-action bg-light"
              activeclassname="selected"
            >
              {icons.dashboard} Dashboard
            </Link>
            <Link
              to="/admin/users"
              className="list-group-item list-group-item-action bg-light"
              activeclassname="selected"
            >
              {icons.users} Users
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
