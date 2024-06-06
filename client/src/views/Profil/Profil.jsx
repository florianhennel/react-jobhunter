import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import Data from "./ProfileData";
import { useGetExperienceQuery } from "../../state/experienceApiSlice";
import JobData from "./ExperienceData";
import { editExperiences } from "../../state/experineceSlice";

export default function Profil() {
  const { id, email, fullname, role } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [edit,setEdit] = useState(false);
  const {
    data: { data, limit, skip, total } = {},
    isLoading,
    isError,
    isSuccess,
  } = useGetExperienceQuery({ token: token });
  const dispatch = useDispatch();
  const exp = useSelector(state=>state.experience.experiences)
  useEffect(()=>{
    dispatch(editExperiences({data}));
  },[data])
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className=" flex justify-center items-center h-full">
        <div className="card bg-neutral shadow-xl w-1/2">
          <div className="card-body">
            <div className=" flex justify-between">
              <h2 className="card-title">Személyes adatok</h2>
            </div>

            <div className="divider"></div>
            <div className=" flex flex-col items-start gap-4">
              <Data title={"Név"} />
              <Data title={"Email"} />
              <Data title={"Státusz"} />
            </div>
            <br />
            <div>
              <h2 className="card-title">Previous experiences</h2>
              <div className="divider"></div>
              {data ? (
                <div className=" flex flex-col items-start gap-1">
                  <JobData job={{company:"Company",interval:"Interval",title:"Position"}} />
                  {data.map((j, index) => (
                    <JobData key={index} job={j} edit={edit} />
                  ))}
                </div>
              ) : (
                "No experiences"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
