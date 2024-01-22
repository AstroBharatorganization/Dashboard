// Need to use the React-specific entry point to import createApi
import { GetUsers } from "../models/users.model";
import { AstrologerFormData, GetAstrologers } from "../models/master.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetSearchWallet, GetWallet } from "../models/wallet.model";
import { GetIncomeReport, SearchIncomeData } from "../models/income.model";
import {
  GetCallRecords,
  GetSearchCallRecord,
} from "../models/callRecord.model";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/dashboard",

    // baseUrl:"https://astro-bharat-backend-env.eba-wu4uqupp.ap-south-1.elasticbeanstalk.com/api/v1",
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

    // get wallet

    getWallet: builder.query<GetWallet, number>({
      query: (page = 1) => `wallet/all?page=${page}`,
    }),

    // search wallet

    getSearchWallet: builder.query<GetSearchWallet, object>({
      query: (filters) => ({
        url: "/wallet/search",
        method: "POST",
        body: filters,
      }),
    }),

    // get income
    getIncome: builder.query<GetIncomeReport, number>({
      query: (page = 1) => `income/all?page=${page}`,
    }),

    // search Income

    getSearchIncome: builder.query<SearchIncomeData, object>({
      query: (filters) => ({
        url: "/income/search",
        method: "POST",
        body: filters,
      }),
    }),

    // get call record

    getCallRecords: builder.query<GetCallRecords, number>({
      query: (page = 1) => `callRecord/all?page=${page}`,
    }),

    // searchCallRecord

    getSearchCallRecord: builder.query<GetSearchCallRecord, object>({
      query: (filters) => ({
        url: "/CallRecord/search",
        method: "POST",
        body: filters,
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
  useGetWalletQuery,
  useLazyGetSearchWalletQuery,
  useGetIncomeQuery,
  useLazyGetSearchIncomeQuery,
  useGetCallRecordsQuery,
  useLazyGetSearchCallRecordQuery,
} = pokemonApi;
