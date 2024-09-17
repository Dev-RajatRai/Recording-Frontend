import { configureStore } from "@reduxjs/toolkit";
import { recordingsApi } from "../Services/recordingsApi";

export const store = configureStore({
  reducer: {
    [recordingsApi.reducerPath]: recordingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recordingsApi.middleware),
});
