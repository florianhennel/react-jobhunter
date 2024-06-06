import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { authSlice } from "./authSlice";
import { jobsSlice } from "./jobsSlice";
import { jobsApiSlice } from "./jobsApiSlice";
import { filterSlice } from "./filterSlice";
import { registerApiSlice } from "./registerApiSlice";
import { experienceApiSlice } from "./experienceApiSlice";
import { experienceSlice } from "./experineceSlice";
import { applicantsApiSlice } from "./applicantsApiSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobsSlice.name]: jobsSlice.reducer,
    [jobsApiSlice.reducerPath]: jobsApiSlice.reducer,
    [filterSlice.name]: filterSlice.reducer,
    [registerApiSlice.reducerPath]: registerApiSlice.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
    [experienceSlice.name]:experienceSlice.reducer,
    [applicantsApiSlice.reducerPath]:applicantsApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(jobsApiSlice.middleware)
      .concat(registerApiSlice.middleware)
      .concat(experienceApiSlice.middleware)
      .concat(applicantsApiSlice.middleware)
});
