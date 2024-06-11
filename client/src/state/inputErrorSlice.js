
import { createSlice } from "@reduxjs/toolkit";
export const inputErrorSlice = createSlice({
  name: "error",
  initialState: {
    'noTitle':false,
    'noCompany':false,
    'noCity':false
  },
  reducers: {
    inputErrors(state,{payload}){
        state.noTitle = payload.noTitle,
        state.noCompany = payload.noCompany,
        state.noCity = payload.noCity
    }
  },
});

export const selectFilters = (state) => {
  return state.filter;
};

export const { inputErrors } = inputErrorSlice.actions;
