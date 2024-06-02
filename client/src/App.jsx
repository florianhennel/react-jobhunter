import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./state/authSlice";
import { Link } from "react-router-dom";
import Navbar from "./views/Navbar";
import Search from "./views/Jobs/Search";
import Job from "./views/Jobs/Job";
import { useGetAllJobsQuery } from "./state/jobsApiSlice";

export default function App() {
  const [count, setCount] = useState(0);
  const user = useSelector(selectUser);
  const {
    data: { total, limit, skip, data } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetAllJobsQuery();
  if (data) {
    console.log(data);
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
