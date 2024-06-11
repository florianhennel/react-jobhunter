import { useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import ProfileData from "./ProfileData";
import { useGetExperienceQuery } from "../../state/experienceApiSlice";
import ExperienceData from "./ExperienceData";
import CreateJobForm from "../Job/CreateJobForm";
import {
  useCreateJobMutation,
  useGetFilteredJobsQuery,
} from "../../state/jobsApiSlice";
import OwnJob from "./OwnJob";

export default function Profil() {
  const { id, email, fullname, role } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [edit, setEdit] = useState(false);
  const {
    data: { data, limit, skip, total } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetExperienceQuery({ token: token });

  const jobs = useGetFilteredJobsQuery({ userId: id });
  const [apiCreateJob] = useCreateJobMutation();

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className=" flex justify-center items-start h-full pt-8">
        {role === "jobseeker" ? (
          <div className="card bg-neutral shadow-xl w-1/2">
            <div className="card-body">
              <div className=" flex justify-between">
                <h2 className="card-title">Személyes adatok</h2>
              </div>

              <div className="divider"></div>
              <div className=" flex flex-col items-start gap-4">
                <ProfileData title={"Név"} />
                <ProfileData title={"Email"} />
                <ProfileData title={"Státusz"} />
              </div>
              <br />
              <div>
                <h2 className="card-title">Previous experiences</h2>
                <div className="divider"></div>
                {data ? (
                  <div className=" flex flex-col items-start gap-1">
                    <ExperienceData
                      job={{
                        company: "Company",
                        interval: "Interval",
                        title: "Position",
                      }}
                    />
                    {data.map((j, index) => (
                      <ExperienceData key={index} job={j} edit={edit} />
                    ))}
                  </div>
                ) : (
                  "No experiences"
                )}
              </div>
            </div>
          </div>
        ) : (
          jobs.isSuccess && (
            <div className=" flex flex-col gap-4 w-1/2 justify-center items-center">
              {jobs.data.data.map((j, index) => (
                <OwnJob key={index} details={j} />
              ))}
              <CreateJobForm details={null}/>
              <button className=" btn btn-primary"
                onClick={() =>
                  document.getElementById("create_job_modal").showModal()
                }
              >
                Hirdetés hozzáadása
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
