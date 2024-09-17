import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recordingsApi = createApi({
  reducerPath: "recordingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getRecordings: builder.query({
      query: (filters) => ({
        url: "/recordings",
        params: filters,
      }),
    }),
    addRecording: builder.mutation({
      query: (newRecording) => ({
        url: "/recordings",
        method: "POST",
        body: newRecording,
      }),
    }),
  }),
});

export const { useGetRecordingsQuery, useAddRecordingMutation } = recordingsApi;
