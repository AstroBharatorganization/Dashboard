// Need to use the React-specific entry point to import createApi
import { GetUsers, GetUserChart } from "../models/users.model";
import { AstrologerFormData, GetAstrologers } from "../models/master.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetSearchWallet,
  GetSearchWalletChart,
  GetWallet,
  GetWalletChart,
} from "../models/wallet.model";
import {
  GetIncomeReport,
  SearchIncomeData,
  GetIncomeRecordData,
} from "../models/income.model";
import {
  GetCallRecords,
  GetSearchCallRecord,
  GetCallRecordReport,
  GetCallRecordByAstrologer,
} from "../models/callRecord.model";
import {
  Banner,
  GetBannerText,
  GetBannerTitle,
  GetFirstBanner,
  GetSecondBannerList,
} from "../models/banner.model";
import {
  GetQueryRecord,
  GetQueryRecordById,
  GetAstrologersQuery,
} from "../models/query.model";
import { GetFeedBackRecord } from "../models/feedback.model";
import { GetStateRecord } from "../models/astrologerOther.model";

import { authHeader } from "./authHeader";
import {
  GetDailyDataReport,
  PostDailyDataReport,
} from "@/models/dailyData.model";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery(authHeader()),
  refetchOnMountOrArgChange: 30,
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

    // search astrologer

    searchAstrologers: builder.query<
      GetAstrologers,
      { filters: object; pageNumber: number }
    >({
      query: ({ filters, pageNumber }) => ({
        url: `/astrologer/search?page=${pageNumber}`,
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

    getSearchWallet: builder.query<
      GetSearchWallet,
      { filters: object; pageNumber: number }
    >({
      query: ({ filters, pageNumber }) => ({
        url: `/wallet/search?page=${pageNumber}`,
        method: "POST",
        body: filters,
      }),
    }),

    // get income
    getIncome: builder.query<GetIncomeReport, number>({
      query: (page = 1) => `income/all?page=${page}`,
    }),

    // search Income

    getSearchIncome: builder.query<
      SearchIncomeData,
      { filters: object; pageNumber: number }
    >({
      query: ({ filters, pageNumber }) => ({
        url: `/income/search?page=${pageNumber}`,
        method: "POST",
        body: filters,
      }),
    }),

    // get call record

    getCallRecords: builder.query<
      GetCallRecords,
      { page: number; limit: number }
    >({
      query: ({ page = 1, limit }) =>
        `callRecord/all?page=${page}&limit=${limit}`,
    }),

    // searchCallRecord

    getSearchCallRecord: builder.query<
      GetSearchCallRecord,
      { filters: object; pageNumber: number }
    >({
      query: ({ filters, pageNumber }) => ({
        url: `/CallRecord/search?page=${pageNumber}`,
        method: "POST",
        body: filters,
      }),
    }),

    // downLoad csv

    getDownload: builder.query<
      GetSearchCallRecord,
      { filters: object; pageNumber: number; limit: number }
    >({
      query: ({ filters, pageNumber, limit }) => ({
        url: `/CallRecord/search?page=${pageNumber}&limit=${limit}`,
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

    // get all user query records

    getQueryRecords: builder.query<GetQueryRecord, number>({
      query: (page = 1) => `/query/all?page=${page}`,
    }),

    // get user query by one

    getQueryRecordsById: builder.query<GetQueryRecordById, any>({
      query: (id) => `/query/details?id=${id}`,
    }),

    // user query updation

    updateQueryRecord: builder.mutation<void, any>({
      query: (id) => ({
        url: `/query/update/${id}`,
        method: "POST",
      }),
    }),

    // user query reply

    userQueryreply: builder.mutation<void, { id: string; reply: string }>({
      query: ({ id, reply }) => ({
        url: `/query/userQueryReply/${id}?reply=${reply}`,
        method: "POST",
        body: reply,
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

    // get astrologer queries

    getAstrologersQuery: builder.query<GetAstrologersQuery, number>({
      query: (page = 1) => `/query/astroQueries?page=${page}`,
    }),

    // update astrologer query status

    updateAstrologerQueryRecord: builder.mutation<void, any>({
      query: (id) => ({
        url: `/query/updateAstroQuery/${id}`,
        method: "POST",
      }),
    }),

    // get astrologer state record

    getAstrologersStateRecord: builder.query<GetStateRecord, number>({
      query: (page = 1) => `/astrologerOther/stateRecord?page=${page}`,
    }),

    // search astrologer state record

    searchAstrologersStateRecord: builder.query<
      GetStateRecord,
      { filters: object; pageNumber: number }
    >({
      query: ({ filters, pageNumber }) => ({
        url: `/astrologerOther/searchState?page=${pageNumber}`,
        method: "POST",
        body: filters,
      }),
    }),

    // get astrologer by id

    getAstrologersById: builder.query<any, any>({
      query: (id) => `astrologer/getByid?id=${id}`,
    }),

    // get call Record report

    getCallRecordReport: builder.query<GetCallRecordReport, void>({
      query: () => `callRecord/dailyReport`,
    }),

    // get call record daily astrologers list

    getAstrologerCallReport: builder.query<GetCallRecordByAstrologer, void>({
      query: () => `callRecord/reportByAstrologer`,
    }),

    // post daily report

    createDailyReportData: builder.mutation<PostDailyDataReport, void>({
      query: () => ({
        url: `report/create`,
        method: "POST",
      }),
    }),

    // get daily report data

    getDailyReportData: builder.query<GetDailyDataReport, void>({
      query: () => `report/getReport`,
    }),

    // get users with zero calls

    getUsersWithZeroCalls: builder.query<GetUsers, void>({
      query: () => `report/usersWithZeroCall`,
    }),

    // Income Report between dates

    getIncomeReportBetweenDates: builder.query<GetIncomeRecordData, void>({
      query: () => `income/data`,
    }),

    // get call month pie chart

    getCallMonthPieChart: builder.query<GetDailyDataReport, void>({
      query: () => `report/getMonthlyCallReport`,
    }),

    // get Astrologer no call list

    getAstrologeraNocallList: builder.query<GetCallRecordByAstrologer, void>({
      query: () => `report/astrologerNoAnswer`,
    }),

    // get new Users count day wise list

    getNewUsersDaywiseList: builder.query<GetUsers, void>({
      query: () => `report/newUsersCountDaywise`,
    }),

    // users with wallet balance

    getUsersWithWalletBalance: builder.query<GetUsers, void>({
      query: () => `report/usersWithWalletBalance`,
    }),

    // users with wallet and no calls

    getUsersWithWalletAndNoCalls: builder.query<GetUsers, void>({
      query: () => `report/usersWithWalletAndNoCalls`,
    }),

    // get consultaion by astrologer in dates

    getConsultationByAstrologer: builder.query<GetCallRecordByAstrologer, void>(
      {
        query: () => `report/consultationData`,
      }
    ),

    // users age bar chart

    getUsersAgeBarChart: builder.query<GetUserChart, void>({
      query: () => `report/userAgeBarChart`,
    }),
  }),
});

export const {
  useCreateAstrologerMutation,
  useGetAstrologersQuery,
  useGetAstrologersByIdQuery,
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
  useLazyGetDownloadQuery,
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
  useUserQueryreplyMutation,
  useGetFeedbackRecordsQuery,
  useGetWalletChartQuery,
  useLazySearchWalletChartQuery,
  useGetAstrologersQueryQuery,
  useUpdateAstrologerQueryRecordMutation,
  useGetAstrologersStateRecordQuery,
  useLazySearchAstrologersStateRecordQuery,
  useGetCallRecordReportQuery,
  useCreateDailyReportDataMutation,
  useGetAstrologerCallReportQuery,
  useGetDailyReportDataQuery,
  useGetUsersWithZeroCallsQuery,
  useGetIncomeReportBetweenDatesQuery,
  useGetCallMonthPieChartQuery,
  useGetAstrologeraNocallListQuery,
  useGetNewUsersDaywiseListQuery,
  useGetUsersWithWalletBalanceQuery,
  useGetUsersWithWalletAndNoCallsQuery,
  useGetConsultationByAstrologerQuery,
  useGetUsersAgeBarChartQuery,
} = pokemonApi;
