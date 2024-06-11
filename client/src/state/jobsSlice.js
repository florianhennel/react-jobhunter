import { createSlice } from "@reduxjs/toolkit";
import { jobsApiSlice } from "./jobsApiSlice";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    total: 0,
    limit: 10,
    skip: 0,
    data: [],
  },
  reducers: {
    getAllJobs(state, { payload }) {
      state.total = payload.total;
      state.limit = payload.limit;
      state.skip = payload.skip;
      state.data = payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      jobsApiSlice.endpoints.getAllJobs.matchFulfilled,
      (state, { payload }) => {
        state.total = payload.total;
        state.limit = payload.limit;
        state.skip = payload.skip;
        state.data = payload.data;
      }
    ),
      builder.addMatcher(
        jobsApiSlice.endpoints.getFilteredJobs.matchFulfilled,
        (state, { payload }) => {
          state.total = payload.total;
          state.limit = payload.limit;
          state.skip = payload.skip;
          state.data = payload.data;
        }
      );
  },
});

export const { inputErrors } = jobsSlice.actions;
