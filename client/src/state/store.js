import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice";
import { authSlice } from "./authSlice";
import { jobsSlice } from "./jobsSlice";
import { jobsApiSlice } from "./jobsApiSlice";
import { filterSlice } from "./filterSlice";

export const store = configureStore({
    reducer:{
        [authSlice.name] : authSlice.reducer,
        [authApiSlice.reducerPath] : authApiSlice.reducer,
        [jobsSlice.name]:jobsSlice.reducer,
        [jobsApiSlice.reducerPath]:jobsApiSlice.reducer,
        [filterSlice.name]:filterSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>(
        getDefaultMiddleware().concat(authApiSlice.middleware).concat(jobsApiSlice.middleware)
    )
})