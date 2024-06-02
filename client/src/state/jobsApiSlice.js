import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/jobs",
    }),
    endpoints: (builder)=>({
        getAllJobs:builder.query({
            query: ()=> ""
        })
    })
})

export const { useGetAllJobsQuery } = jobsApiSlice;