import React, { useState } from "react";
import koizIcon from "../assets/koiz-full-trans.png";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "../Redux/Features/commonSlice";
import { resetHistoricalData } from "../Redux/Features/storeDataSlice";
import { removeDevCon } from "../Redux/Features/devConSlice";
import { authKey } from "../Context";
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const userDetails = useSelector((state) => state.common.userDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem(authKey);
    dispatch(onLogout());
    dispatch(resetHistoricalData());
    dispatch(removeDevCon());
    dispatch(removeCsvData());
  };

  const navLinks = [
    { path: "/sensor", label: "Sensor" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-1 px-6 flex items-center justify-between">
      <img className="w-auto h-8 mr-2" src={koizIcon} alt="logo" />
      <div className="flex flex-row justify-center gap-10 items-center">
        {navLinks.map((link) => (
          <div key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-2 text-blue-700 rounded text-base font-bold"
                  : "block py-2 px-2 text-gray-600 rounded md:bg-transparent text-base font-bold"
              }
            >
              {link.label}
            </NavLink>
          </div>
        ))}
        <div className="relative flex flex-col">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center items-center gap-2 text-sm font-semibold text-white"
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
