import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";
import { Link } from "react-router-dom";
import Navbar from "./views/Navbar";
import Search from "./views/Jobs/Search";
import Job from "./views/Jobs/Job";
import { useGetAllJobsQuery, useGetFilteredJobsQuery } from "./state/jobsApiSlice";
import { selectFilters } from "./state/filterSlice";

export default function App() {
  const user = useSelector(selectUser);
  const filters = useSelector(selectFilters);
  console.log(filters);
  const {
    data: { total, limit, skip, data } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetFilteredJobsQuery(filters);
  if (data) {
    return (
      <div className="w-full">
        <Navbar />
        <div className="flex flex-col justify-center items-center gap-10">
          <Search />
          <div className="w-full flex justify-center gap-3">
            {data.map((job, index) => (
              <Job key={index} details={job} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No jobs...</div>;
  }
}
