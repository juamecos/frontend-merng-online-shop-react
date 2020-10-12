import React from "react";
import icons from "../../../assets/icons";
import "./Sidebar.scss";
const Sidebar = ({ showSidebar }) => {
  return (
    <>
      {showSidebar && (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Start Bootstrap </div>
          <div className="list-group list-group-flush">
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
            >
              {icons.dashboard} Dashboard
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action bg-light"
            >
              {icons.users} Users
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
