import { useState } from "react";
import { useLoginMutation } from "../state/authApiSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import App from "../App.jsx";

export default function Login() {
  const [apiLogin] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const changeInput = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-neutral shadow-xl flex flex-col items-center gap-3">
        <div className=" p-2 card-title">Login to your account!</div>
        <label className="input input-bordered flex items-center gap-2">
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

        <label className="input input-bordered flex items-center gap-2">
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
        <div className=" card-actions justify-end">
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={() => {
              apiLogin({
                body: {
                  email: email,
                  password: password,
                },
              }).then((response) => {
                navigate("/")
              });
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
