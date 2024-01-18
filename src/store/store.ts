import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../services/master.service";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
