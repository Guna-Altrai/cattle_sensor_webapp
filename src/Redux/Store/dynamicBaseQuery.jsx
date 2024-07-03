import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authKey } from "../../Context";

const dynamicBaseQuery = async (args, WebApi, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: window.REACT_APP_BASE_URL,
    credentials: "include",
    prepareHeaders: async (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem(authKey);
      if (token && token.length > 0) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  return rawBaseQuery(args, WebApi, extraOptions);
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await dynamicBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
  } else if (result.error && result.error.status === 400) {
    // show toast here
    console.error(result.error.data?.message || "Something went wrong.");
  }
  return result;
};

export const backendApi = createApi({
  reducerPath: "backend",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
