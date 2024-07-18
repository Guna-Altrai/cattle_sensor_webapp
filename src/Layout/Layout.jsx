import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-auto bg-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />

        <div className="flex-1 overflow-y-auto">{children}</div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
