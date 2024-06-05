import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3030/jobs",
    }),
    tagTypes:['jobs'],
    endpoints: (builder)=>({
        getAllJobs:builder.query({
            query: ()=> "",   
        }),
        getFilteredJobs:builder.query({
            query:(filters)=>filterBuilder(filters),
            providesTags:['jobs']
        })
    })
})
const filterBuilder = (filters)=>{
    let string = "?";
    if (filters.minWage !== null) {
        string+=`salaryFrom[$gte]=${filters.minWage*20000}&`
    }
    if (filters.maxWage !== null) {
        string+=`salaryTo[$lte]=${filters.maxWage*20000}&`
    }
    if (filters.title !== "") {
        string+=`position[$like]=%${filters.title}%&`
    }
    if (filters.jobType !== "Összes") {
        string+=`type=${(filters.jobType).toLowerCase()}&`
    }
    if (filters.location !== "") {
        string+=`city=${filters.location}&`
    }
    if (filters.homeOffice !== null) {
        string+=`homeOffice=${filters.homeOffice}&`
    }
    if (filters.userId !== null) {
        string+=`userId=${filters.userId}&`
    }
    if (filters.company !== "") {
        string+=`company[$like]=%${filters.company}%&`
    }
    if (string.length===1) {
        return "";
    }else{
        return string.substring(0,(string.length-1));
    }
}
export const { useGetAllJobsQuery, useGetFilteredJobsQuery } = jobsApiSlice;