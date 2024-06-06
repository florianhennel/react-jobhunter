import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const applicantsApiSlice = createApi({
    reducerPath: "applicantsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/applicants",
    }),
    endpoints: (builder)=>({
        applyForJob:builder.mutation({
            query: ({body,token})=> ({
                method:"POST",
                headers: {
                    'Content-type': "application/json",
                    'Accept': "application/json",
                    'Authorization': "Bearer " + token,
                  },
                  body:body,
            }),   
        }),
    })
})

export const { useApplyForJobMutation } = applicantsApiSlice