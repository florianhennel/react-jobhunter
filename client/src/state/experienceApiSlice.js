import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const experienceApiSlice = createApi({
  reducerPath: "experienceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/experiences",
  }),
  tagTypes: ["modified"],
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: ({ token }) => ({
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags:['modified']
    }),
    addExperience: builder.mutation({
      query: ({ body, token }) => ({
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: body,
      }),
    }),
    modifyExperience: builder.mutation({
      query: ({ body, token, id }) => ({
        method: "PATCH",
        url: `${id}`,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: body,
      }),
      invalidatesTags:['modified']
    }),
  }),
});

export const {
  useAddExperienceMutation,
  useGetExperienceQuery,
  useModifyExperienceMutation,
} = experienceApiSlice;
