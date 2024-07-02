import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendApi } from "../Store/dynamicBaseQuery";

export const getAuthentication = backendApi.injectEndpoints({
  overrideExisting: true,
  baseQuery: fetchBaseQuery({ baseUrl: `${window.REACT_APP_BASE_URL}` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "admin_login/",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register/",
        method: "POST",
        body: credentials,
      }),
    }),
    userData: builder.mutation({
      query: () => ({
        url: "user_details/",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useUserDataMutation } =
  getAuthentication;
