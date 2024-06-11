import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/jobs",
  }),
  tagTypes: ["jobs"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "",
    }),
    getOneJob: builder.query({
      query: ({ id }) => `${id}`,
    }),
    getFilteredJobs: builder.query({
      query: (filters) => filterBuilder(filters),
      providesTags: ["jobs"],
    }),
    modifyJob: builder.mutation({
      query: ({ id, body, token }) => ({
        method: "PATCH",
        url: `${id}`,
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: body,
      }),
      invalidatesTags:['jobs']
    }),
    deleteJob:builder.mutation({
        query: ({token, id}) => ({
            method:"DELETE",
            url:`${id}`,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
              },
        }),
        invalidatesTags:['jobs']
    }),
    createJob:builder.mutation({
        query: ({token,body})=>({
            method:"POST",
            url:"/1",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
              },
            body:body
        }),
        invalidatesTags:['jobs']
    })
  }),
});
const filterBuilder = ({
  minWage,
  maxWage,
  title,
  jobType,
  location,
  homeOffice,
  userId,
  company,
}) => {
  let string = "?";
  if (minWage) {
    string += `salaryFrom[$gte]=${minWage * 20000}&`;
  }
  if (maxWage) {
    string += `salaryTo[$lte]=${maxWage * 20000}&`;
  }
  if (title) {
    string += `position=${title}&`;
  }
  if (jobType !== "Összes" && jobType) {
    string += `type=${jobType.toLowerCase()}&`;
  }
  if (location) {
    string += `city=${location}&`;
  }
  if (homeOffice) {
    string += `homeOffice=${homeOffice}&`;
  }
  if (userId) {
    string += `userId=${userId}&`;
  }
  if (company) {
    string += `company[$like]=%${company}%&`;
  }
  if (string.length === 1) {
    return "";
  } else {
    return string.substring(0, string.length - 1);
  }
};
export const {
  useGetAllJobsQuery,
  useGetFilteredJobsQuery,
  useGetOneJobQuery,
  useModifyJobMutation,
  useDeleteJobMutation,
  useCreateJobMutation
} = jobsApiSlice;
