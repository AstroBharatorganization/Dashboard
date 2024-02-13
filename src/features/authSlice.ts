import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

import { LoginResponse } from "../models/admin.model";

const initialState = {
  token: null,
} as LoginResponse;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAdmin: (state: LoginResponse, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
    },
    logOut: (state: LoginResponse) => {
      state.token = null;
    },
  },
});

export const { setAdmin, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state!.auth.token;
