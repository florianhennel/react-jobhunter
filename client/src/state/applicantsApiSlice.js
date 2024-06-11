import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicantsApiSlice = createApi({
  reducerPath: "applicantsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/applicants",
  }),
  tagTypes:["applications"],
  endpoints: (builder) => ({
    applyForJob: builder.mutation({
      query: ({ body, token }) => ({
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: body,
      }),
      invalidatesTags:["applications"],
    }),
    getApplicantsForAJob: builder.query({
      query: ({ token, id }) => ({
        method: "GET",
        url: `?jobId=${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      providesTags:["applications"],
    }),
    getJobsForAnApplicant : builder.query({
      query: ({id, token}) =>({
        method: "GET",
        url: `?userId=${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      providesTags:["applications"],
    })
  }),
});

export const { useApplyForJobMutation, useGetApplicantsForAJobQuery, useGetJobsForAnApplicantQuery } =
  applicantsApiSlice;
