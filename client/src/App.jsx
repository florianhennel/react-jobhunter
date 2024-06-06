import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";
import { Link } from "react-router-dom";
import Navbar from "./views/Navbar";
import Search from "./views/Frontpage/Search";
import Job from "./views/Frontpage/Job";
import {
  useGetFilteredJobsQuery,
} from "./state/jobsApiSlice";
import { selectFilters } from "./state/filterSlice";

export default function App() {
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
          <div className="w-full flex items-center justify-center gap-3 flex-col">
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
