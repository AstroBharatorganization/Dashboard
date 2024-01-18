// Need to use the React-specific entry point to import createApi
import { GetUsers } from "@/models/users.model";
import { AstrologerFormData, GetAstrologers } from "../models/master.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/dashboard",
  }),
  endpoints: (builder) => ({
    // get astrologers
    getAstrologers: builder.query<GetAstrologers, number>({
      query: (page = 1) => `/astrologer/all?page=${page}`,
    }),

    

    

    // post register
    createAstrologer: builder.mutation<AstrologerFormData, object>({
      query: (astrologer) => ({
        url: "/astrologer/register",
        method: "POST",
        body: astrologer,
      }),
    }),

    // update astrologer

    updateAstrologer: builder.mutation<AstrologerFormData, any>({
      query: ({ _id, updatedAstrologer }) => ({
        url: `/astrologer/update/${_id}`,
        method: "POST",
        body: updatedAstrologer,
      }),
    }),

    // search user

    searchAstrologers: builder.query<GetAstrologers, object>({
      query: (filters) => ({
        url: "/astrologer/search",
        method: "POST",
        body: filters,
      }),
    }),

    // get users
    getUsers: builder.query<GetUsers, number>({
      query: (page = 1) => `user/all?page=${page}`,
    }),

    // search users

    searchUsers: builder.query<GetUsers, object>({
      query: (username) => ({
        url: "/user/search",
        method: "POST",
        body: { username },
      }),
    }),

    // admin login

    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateAstrologerMutation,
  useGetAstrologersQuery,
  useUpdateAstrologerMutation,
  useGetUsersQuery,
  useLazySearchUsersQuery,
  useLazySearchAstrologersQuery,
  useAdminLoginMutation,
} = pokemonApi;
