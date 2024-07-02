import React, { createContext, useContext, useEffect, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  console.log("api context running");

  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
