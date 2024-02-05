// Need to use the React-specific entry point to import createApi
import { GetUsers } from "../models/users.model";
import { AstrologerFormData, GetAstrologers } from "../models/master.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetSearchWallet,
  GetSearchWalletChart,
  GetWallet,
  GetWalletChart,
} from "../models/wallet.model";
import { GetIncomeReport, SearchIncomeData } from "../models/income.model";
import {
  GetCallRecords,
  GetSearchCallRecord,
} from "../models/callRecord.model";
import {
  Banner,
  GetBannerText,
  GetBannerTitle,
  GetFirstBanner,
  GetSecondBannerList,
} from "../models/banner.model";
import { GetQueryRecord, GetQueryRecordById } from "../models/query.model";
import { GetFeedBackRecord } from "../models/feedback.model";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/dashboard",

    // baseUrl:
    //   "http://astro-bharat-backend-env.eba-wu4uqupp.ap-south-1.elasticbeanstalk.com/api/v1/dashboard",
  }),
  endpoints: (builder) => ({
    // get astrologers
    getAstrologers: builder.query<GetAstrologers, number>({
      query: (page = 1) => `astrologer/all?page=${page}`,
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

    // upload First banner

    addSingleBanner: builder.mutation<Banner, object>({
      query: (data) => ({
        url: "/banner/first/add",
        method: "POST",
        body: data,
      }),
    }),

    // get First banner

    getSingleBanner: builder.query<GetFirstBanner, void>({
      query: () => `/banner/first/get`,
    }),

    // upload second Banner

    addSecondBannerList: builder.mutation<Banner, object>({
      query: (data) => ({
        url: "/banner/second/add",
        method: "POST",
        body: data,
      }),
    }),

    // get Second Banner list

    getSecondBannerList: builder.query<GetSecondBannerList, void>({
      query: () => `/banner/second/get`,
    }),

    // add banner Text and Description

    addBannerTextAndDescription: builder.mutation<Banner, object>({
      query: (data) => ({
        url: "/banner/homeText/add",
        method: "POST",
        body: data,
      }),
    }),

    // get Banner Text and Description

    getBannerTextAndDescription: builder.query<GetBannerText, void>({
      query: () => `/banner/homeText/get`,
    }),

    // add Banner Title

    addBannerTitle: builder.mutation<Banner, object>({
      query: (data) => ({
        url: "/banner/bannerTitle/add",
        method: "POST",
        body: data,
      }),
    }),

    // get Banner Title

    getBannerTitle: builder.query<GetBannerTitle, void>({
      query: () => `/banner/bannerTitle/get`,
    }),

    // call record refund

    refundCallRecord: builder.mutation<void, number>({
      query: (id) => ({
        url: `/CallRecord/refund/${id}`,
        method: "POST",
      }),
    }),

    // get all query records

    getQueryRecords: builder.query<GetQueryRecord, number>({
      query: (page=1) => `/query/all?page=${page}`,
    }),

    // get query by one

    getQueryRecordsById: builder.query<GetQueryRecordById, any>({
      query: (id) => `/query/details?id=${id}`,
    }),

    // query updation

    updateQueryRecord: builder.mutation<void, any>({
      query: (id) => ({
        url: `/query/update/${id}`,
        method: "POST",
      }),
    }),

    // get feedback

    getFeedbackRecords: builder.query<GetFeedBackRecord, number>({
      query: (page = 1) => `/feedback/all?page=${page}`,
    }),

    // get wallet chart

    getWalletChart: builder.query<GetWalletChart, void>({
      query: () => `/wallet/walletChart`,
    }),

    //  search wallet chart

    searchWalletChart: builder.query<GetSearchWalletChart, object>({
      query: (data) => ({
        url: `/wallet/searchChart`,
        method: "POST",
        body: data,
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
  useAddSingleBannerMutation,
  useGetSingleBannerQuery,
  useAddSecondBannerListMutation,
  useGetSecondBannerListQuery,
  useGetBannerTextAndDescriptionQuery,
  useAddBannerTextAndDescriptionMutation,
  useAddBannerTitleMutation,
  useGetBannerTitleQuery,
  useRefundCallRecordMutation,
  useGetQueryRecordsQuery,
  useGetQueryRecordsByIdQuery,
  useUpdateQueryRecordMutation,
  useGetFeedbackRecordsQuery,
  useGetWalletChartQuery,
  useLazySearchWalletChartQuery,
} = pokemonApi;
