import React from "react";
import { Route } from "react-router-dom";
import Login from "../Auth/Login";
import Dashboard from "../Components/Dashboard";
import Sensor from "../Components/Sensor";
import PrivateRoute from "./PrivateRoute";
import Milk from "../Components/Milk";
import FeedManagement from "../Components/Food/FeedManagement";
import FeedExpenses from "../Components/Food/FeedExpenses";
import HealthManagement from "../Components/Health/HealthManagement";
import HealthExpenses from "../Components/Health/HealthExpenses";
import Sensors from "../Components/Sensor/Sensors";

const dashboardRoutes = {
  path: "/admin",
  name: "Dashboard",
  icon: "home",
  header: "Navigation",
  children: [
    {
      path: "/",
      name: "Root",
      element: <Dashboard />,
      route: PrivateRoute,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      element: <Dashboard />,
      route: PrivateRoute,
    },
  ],
};

const milkRoutes = {
  path: "/milk",
  name: "Milk",
  element: <Milk />,
  route: PrivateRoute,
};

const sensorRoutes = {
  path: "/sensor",
  name: "Sensors",
  element: <Sensors />,
  route: PrivateRoute,
};

const feedRoutes = {
  path: "/feed",
  name: "Feed",
  header: "Feed",
  children: [
    {
      path: "/feed/management",
      name: "Food Management",
      element: <FeedManagement />,
      route: PrivateRoute,
    },
    {
      path: "/feed/expenses",
      name: "Food Expenses",
      element: <FeedExpenses />,
      route: PrivateRoute,
    },
  ],
};
const HealthRoutes = {
  path: "/health",
  name: "Health",
  header: "Health",
  children: [
    {
      path: "/health/management",
      name: "Health Management",
      element: <HealthManagement />,
      route: PrivateRoute,
    },
    {
      path: "/health/expenses",
      name: "Health Expenses",
      element: <HealthExpenses />,
      route: PrivateRoute,
    },
  ],
};

const authRoutes = [
  {
    path: "/auth/login",
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

const authProtectedListedRoutes = listedRoutes([
  dashboardRoutes,
  milkRoutes,
  feedRoutes,
  HealthRoutes,
  sensorRoutes,
]);
const publicListedRoutes = listedRoutes(authRoutes);

export {
  authProtectedListedRoutes,
  publicListedRoutes,
  dashboardRoutes,
  milkRoutes,
  feedRoutes,
  HealthRoutes,
  sensorRoutes,
};
