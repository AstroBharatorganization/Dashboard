// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/dashboard",
  }),
  endpoints: (builder) => ({
    // get astrologers
    getAstrologers: builder.query({
      query: () => "/astrologer/all",
    }),

    // post register
    createAstrologer: builder.mutation<any, any>({
      query: (astrologer) => ({
        url: "/astrologer/register",
        method: "POST",
        body: astrologer,
      }),
    }),
  }),
});

export const { useCreateAstrologerMutation, useGetAstrologersQuery } =
  pokemonApi;
