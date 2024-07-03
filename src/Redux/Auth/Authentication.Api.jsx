import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendApi } from "../Store/dynamicBaseQuery";

export const getAuthentication = backendApi.injectEndpoints({
  overrideExisting: true,
  baseQuery: fetchBaseQuery({ baseUrl: `${window.REACT_APP_BASE_URL}` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    sensorPost: builder.mutation({
      query: (credentials) => ({
        url: "sensor/",
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

export const { useLoginMutation, useSensorPostMutation, useUserDataMutation } =
  getAuthentication;
