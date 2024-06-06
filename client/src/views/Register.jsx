import { useEffect, useState } from "react";
import { useRegisterMutation } from "../state/registerApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import App from "../App.jsx";
import { useLoginMutation } from "../state/authApiSlice.js";
import { useAddExperienceMutation } from "../state/experienceApiSlice.js";

export default function Register() {
  const [apiRegister] = useRegisterMutation();
  const [apiLogin] = useLoginMutation();
  const [apiAddExperience] = useAddExperienceMutation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [experience, setExperience] = useState("");

  const changeInput = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "fullname") {
      setFullname(event.target.value);
    } else if (event.target.name === "experience") {
      setExperience(event.target.value);
    } else {
      event.target.value === "Munkavállaló"
        ? setRole("jobseeker")
        : setRole("company");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="card w-1/4 bg-neutral shadow-xl flex flex-col items-center gap-3 rounded-xl p-6">
        <div className=" p-2 card-title">Create a new account!</div>
        <label className="input input-bordered flex items-center gap-2 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>

          <input
            type="text"
            className="grow"
            name="email"
            placeholder="Email"
            onInput={changeInput}
            value={email}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            name="fullname"
            placeholder="Full name"
            value={fullname}
            onInput={changeInput}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            name="password"
            placeholder="Password"
            onInput={changeInput}
            value={password}
          />
        </label>
        <select
          className="select flex w-3/4 gap-2 select-bordered"
          name="jobType"
          value={role === "jobseeker" ? "Munkavállaló" : "Munkáltató"}
          onChange={changeInput}
          placeholder="Profil típusa"
        >
          <option className=" bg-neutral">Munkavállaló</option>
          <option className=" bg-neutral">Munkáltató</option>
        </select>
        {role === "jobseeker" && (
          <label className="form-control w-3/4">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Past experiences:
[company name];[position];[from-to]"
              name="experience"
              value={experience}
              onInput={changeInput}
            ></textarea>
          </label>
        )}
        <div className=" card-actions justify-end">
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={async () => {
              const registerResponse = await apiRegister({
                body: {
                  email: email,
                  fullname: fullname,
                  password: password,
                  role: role,
                },
              });

              if (registerResponse.data) {
                const loginResponse = await apiLogin({
                  body: {
                    email: email,
                    password: password,
                  },
                });
                if (loginResponse.data) {
                  const experiences = [];
                  if (experience.length > 0) {
                    experience.split("\n").forEach((exp) => {
                      const e = exp.split(";");
                      experiences.push({
                        company: e[0],
                        title: e[1],
                        interval: e[2],
                      });
                    });
                  }
                  if (experiences.length > 0) {
                    console.log(experiences);
                    apiAddExperience({
                      body: experiences,
                      token: loginResponse.data.accessToken,
                    }).then((response) => {
                      navigate("/");
                    });
                  }
                }
              }
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
