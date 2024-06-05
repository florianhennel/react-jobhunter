import { createSlice } from "@reduxjs/toolkit";
export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    title: "",
    minWage: 0,
    maxWage: 100,
    jobType: "Összes",
    location: "",
    homeOffice: false,
    company: "",
    userId: null,
  },
  reducers: {
    setFilters(state, { payload }) {
        state.title = payload.title,
        state.minWage = payload.minWage,
        state.maxWage = payload.maxWage,
        state.jobType = payload.jobType,
        state.location = payload.location,
        state.homeOffice = payload.homeOffice,
        state.company = payload.company,
        state.userId = payload.userId
    },
  },
});

export const selectFilters = (state) => {
  return state.filter;
};

export const { setFilters } = filterSlice.actions;
