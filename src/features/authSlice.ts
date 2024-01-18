import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";

import { LoginResponse } from "../models/admin.model";

const initialState: LoginResponse = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<{ token: string }>) => {
      localStorage.setItem(
        "admin",
        JSON.stringify({
          token: action.payload.token,
        })
      );

      state.token = action.payload.token;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setAdmin } = authSlice.actions;

export default authSlice.reducer;
