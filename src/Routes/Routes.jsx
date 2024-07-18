import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../Context";
import Layout from "../Layout/Layout";
import { authProtectedListedRoutes, publicListedRoutes } from ".";

const AllRoutes = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {publicListedRoutes.map((route, idx) => (
        <Route path={route.path} element={route.element} key={idx} />
      ))}
      {authProtectedListedRoutes.map((route, idx) => (
        <Route
          path={route.path}
          element={
            isAuthenticated ? (
              <Layout>{route.element}</Layout>
            ) : (
              <Navigate to={{ pathname: "/auth/login" }} />
            )
          }
          key={idx}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes;
