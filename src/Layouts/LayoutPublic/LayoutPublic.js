import React from "react";
import "./LayoutPublic.scss";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutPublic = ({ children }) => {
  return (
    <div className="layout-public">
      <Header />
      <Navbar />
      <main className="main container">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPublic;
