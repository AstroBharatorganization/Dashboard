import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.ts";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "../services/master.service";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

export const persistor = persistStore(store);
