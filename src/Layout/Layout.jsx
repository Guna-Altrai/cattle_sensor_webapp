import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow  bg-gray-100 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
