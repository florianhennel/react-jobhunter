import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModifyExperienceMutation } from "../../state/experienceApiSlice";

export default function JobData({ job }) {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experience.experiences);
  const token = useSelector(state=>state.auth.token);
  const [apiEditExperiences] = useModifyExperienceMutation();

  const [edit, setEdit] = useState(false);
  const [company, setCompany] = useState(job.company);
  const [title, setTitle] = useState(job.title);
  const [interval, setInterval] = useState(job.interval);
  
  const handleModify = ()=>{
    setEdit(false);
    apiEditExperiences({
        id:job.id,
        body:{
            company:company,
            title:title,
            interval:interval
        },
        token:token,
    })
  }
  if (edit) {
    const handleInput = (event) => {
      const target = event.target;
      if (target.name === "company") {
        setCompany(target.value);
      } else if (target.name === "title") {
        setTitle(target.value);
      } else {
        setInterval(target.value);
      }
    };
    return (
      <div
        className={` flex w-full justify-between ${
          job.company === "Company" ? " pb-3" : ""
        }`}
      >
        <input
          className=" input input-sm input-bordered"
          type="text"
          name="company"
          value={company}
          onInput={handleInput}
        ></input>
        <input
          className=" input input-sm input-bordered"
          type="text"
          name="title"
          value={title}
          onInput={handleInput}
        ></input>
        <input
          className=" input input-sm input-bordered"
          type="text"
          name="interval"
          value={interval}
          onInput={handleInput}
        ></input>
        <button
          className={` btn btn-primary ${job.id ? "visible" : "hidden"}`}
          onClick={handleModify}
        >
          Done
        </button>
      </div>
    );
  }
  return (
    <div
      className={` flex w-full justify-between ${
        job.company === "Company" ? " pb-3" : ""
      }`}
    >
      <div className=" flex gap-8">
        <div>{job.company}</div>
        <div>{job.title}</div>
        <div>{job.interval}</div>
      </div>

      <button
        className={` btn btn-primary ${job.id ? "visible" : "hidden"}`}
        onClick={() => setEdit(true)}
      >
        Edit
      </button>
    </div>
  );
}
