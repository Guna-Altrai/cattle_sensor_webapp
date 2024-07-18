import React, { useState } from "react";
import koizIcon from "../assets/Images/cow_logo.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "../Redux/Features/commonSlice";
import { authKey } from "../Context";
import { FaUser } from "react-icons/fa";
import { resetSensor } from "../Redux/Features/sensorSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { openSidebar } from "../Redux/Features/layout.slice";
import NavBreadcrumb from "./Navbar Utils/NavBreadcrumb";

const Navbar = () => {
  const userDetails = useSelector((state) => state.common.userDetails);
  const isSidebarOpen = useSelector((state) => state.layout.isSidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/auth/login");
    localStorage.removeItem(authKey);
    dispatch(onLogout());
    dispatch(resetSensor());
  };

  const handleSidebarToggle = () => {
    dispatch(openSidebar(!isSidebarOpen));
  };

  return (
    <nav className="bg-white border-gray-200 p-2 px-6 flex items-center lg:hidden block justify-between">
      <div className="h-full items-center justify-center flex lg:hidden">
        <button onClick={handleSidebarToggle} className="text-black ">
          <GiHamburgerMenu className="size-7 opacity-80" />
        </button>
      </div>
      <div className="h-full items-center justify-center flex ">
        <NavBreadcrumb />
      </div>
      <div className="flex flex-row justify-center gap-10 items-center">
        <div className="relative flex flex-col">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-2 text-sm font-semibold text-gray-800"
              id="menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              {userDetails.name}
              <FaUser />
            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 text-sm text-gray-700 font-bold"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Admin
                </a>
                <a
                  href="#"
                  className="block px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  {userDetails.email}
                </a>
              </div>

              <div className="py-1" role="none">
                <button
                  onClick={handleLogout}
                  className="text-red-600 px-4 py-2 font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
