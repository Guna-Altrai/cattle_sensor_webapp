import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "./MenuItems";
import koizIcon from "../assets/Images/cow_logo.png";
import { IoChevronBack, IoChevronUpOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { expandSidebar } from "../Redux/Features/layout.slice";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSidebarExpanded, isSidebarOpen } = useSelector(
    (state) => state.layout
  );
  console.log("side bar expand :", isSidebarExpanded);
  const toggleRoute = (routeKey, hasChildren) => {
    if (hasChildren) {
      setOpenMenu((prevOpenMenu) =>
        prevOpenMenu === routeKey ? null : routeKey
      );
    } else {
      setOpenMenu(null); // Close any open dropdown when a non-dropdown item is clicked
    }
  };

  const isActiveRoute = (url) => {
    return location.pathname === url;
  };

  const generateMenuItems = (items) => {
    return items.map((item) => {
      const isOpen = openMenu === item.key;
      const isParentActive =
        item.children &&
        item.children.some((child) => isActiveRoute(child.url));

      const isDropdownActive = isOpen || isParentActive;
      const isActive = isActiveRoute(item.url);

      if (!isSidebarExpanded && item.children) {
        // Render nested menu when not expanded
        return (
          <li key={item.key} className="relative">
            <div
              className="relative"
              onClick={() => toggleRoute(item.key, !!item.children)}
              onMouseEnter={() => setHoveredItem(item.key)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Menu>
                <MenuHandler>
                  <Link
                    to={item.url}
                    className={`flex items-center justify-between text-gray-800 font-semibold text-lg py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      isDropdownActive
                        ? "text-white bg-gray-200 border-l-4 border-red-600"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`w-auto h-8 ${
                          !isSidebarExpanded ? "mx-auto" : ""
                        }`}
                      />
                    )}
                  </Link>
                </MenuHandler>
                <MenuList className="absolute ml-24 top-0">
                  {item.children.map((child) => (
                    <MenuItem key={child.key}>
                      <Link
                        to={child.url}
                        className={`flex items-center justify-between text-gray-800 px-2 cursor-pointer transition-all duration-300 ${
                          isActiveRoute(child.url)
                            ? "font-bold border-l-4 border-red-600"
                            : "hover:text-gray-800 hover:font-bold border-l-4 hover:border-red-300 font-semibold"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
            {!isSidebarExpanded && hoveredItem === item.key && (
              <div
                className="absolute left-24 top-1/2 bg-gray-300 p-1 text-sm transform -translate-y-1/2 flex items-center justify-between text-gray-900 px-4 cursor-pointer transition-all duration-300 z-50
            font-semibold rounded-lg border-l-8 border-red-600"
              >
                {item.label}
              </div>
            )}
          </li>
        );
      }

      return (
        <li key={item.key} className="relative">
          <Link
            to={item.url}
            className={`flex items-center justify-between text-gray-800 font-semibold text-lg py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 ${
              isActive
                ? "bg-gray-100 border-l-4 border-red-600"
                : isDropdownActive
                ? "bg-gray-100 border-l-4 border-red-600"
                : "hover:bg-gray-200"
            }`}
            onClick={() => toggleRoute(item.key, !!item.children)}
            onMouseEnter={() => setHoveredItem(item.key)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center w-full">
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-auto h-8 ${
                    !isSidebarExpanded ? "mx-auto" : ""
                  }`}
                />
              )}
              {isSidebarExpanded && (
                <span className="block w-full ml-4">{item.label}</span>
              )}
              {item.children && isSidebarExpanded && (
                <span
                  className={`ml-2 transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "rotate-180"
                  }`}
                >
                  <IoChevronUpOutline />
                </span>
              )}
            </div>
          </Link>
          {item.children && isOpen && isSidebarExpanded && (
            <ul className="pl-4 space-y-6 mt-6">
              {item.children.map((child) => (
                <li key={child.key}>
                  <Link
                    to={child.url}
                    className={`flex items-center justify-between text-gray-800 px-2 cursor-pointer transition-all duration-300 ${
                      isActiveRoute(child.url)
                        ? "font-bold border-l-4 border-red-600"
                        : "hover:text-gray-800 hover:font-bold font-semibold"
                    }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!isSidebarExpanded && hoveredItem === item.key && (
            <div
              className="absolute left-24 top-1/2 bg-gray-300 p-1 text-sm transform -translate-y-1/2 flex items-center justify-between text-gray-900 px-4 cursor-pointer transition-all duration-300 z-50
            font-semibold rounded-lg border-l-8 border-red-600"
            >
              {item.label}
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <div
      id="sidebar"
      className={`bg-white border-2 h-screen z-50 text-white transition-transform duration-300 fixed lg:static ${
        isSidebarExpanded ? "w-64" : "w-24"
      } lg:translate-x-0 p-2`}
      style={{
        left: isSidebarExpanded ? 0 : "-100%",
        boxShadow: isSidebarExpanded ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <button
        className="absolute top-6  right-[-12px] rounded-full  border-2 border-red-200 bg-white p-1 items-center justify-center flex"
        onClick={() => dispatch(expandSidebar(!isSidebarExpanded))}
      >
        <IoChevronBack
          className={`text-red-700 transition-transform duration-300  ${
            isSidebarExpanded ? "rotate-0" : "rotate-180"
          }`}
          size={16}
        />
      </button>
      <div className="flex items-center justify-center mb-8">
        <div className="flex flex-row items-center">
          <img className="w-auto h-10 " src={koizIcon} alt="logo" />
          {isSidebarExpanded && (
            <p className="font-bold text-lg text-gray-800">ABC Cattle</p>
          )}
        </div>
      </div>
      <ul className="space-y-4">{generateMenuItems(MENU_ITEMS)}</ul>
    </div>
  );
};

export default Sidebar;
