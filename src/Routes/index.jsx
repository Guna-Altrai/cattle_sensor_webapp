import React from "react";
import { Route } from "react-router-dom";
import Login from "../Auth/Login";
import Dashboard from "../Components/Dashboard";
import Sensor from "../Components/Sensor";

const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: <Dashboard />,
    route: Route,
  },
  {
    path: "/sensor",
    name: "Sensor",
    element: <Sensor />,
    route: Route,
  },
];

const authRoutes = [
  {
    path: "/",
    name: "Login",
    element: <Login />,
    route: Route,
  },
];

const listedRoutes = (routes) => {
  let routeList = [];

  routes = routes || [];
  routes.forEach((item) => {
    routeList.push(item);
    if (item.children) {
      routeList = [...routeList, ...listedRoutes(item.children)];
    }
  });
  return routeList;
};

const authProtectedListedRoutes = listedRoutes([...adminRoutes]);
const publicListedRoutes = listedRoutes(authRoutes);

export { authProtectedListedRoutes, publicListedRoutes };
