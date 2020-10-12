import React, { useState, useCallback } from "react";
import Header from "./Header/Header";
import "./LayoutAdmin.scss";
import Sidebar from "./Sidebar/Sidebar";
import Title from "./Title/Title";
const LayoutAdmin = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(showSidebar => !showSidebar);
  };
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar showSidebar={showSidebar} />
      <div id="page-content-wrapper">
        <Header toggleSidebar={toggleSidebar} />
        <div className="container-fluid">
          <Title />
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
