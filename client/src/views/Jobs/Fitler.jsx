import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../state/filterSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);
  const [minWage, setMinWage] = useState(filters.minWage);
  const [maxWage, setMaxWage] = useState(filters.maxWage);
  const [location, setLocation] = useState(filters.location);
  const [jobType, setJobType] = useState(filters.jobType);
  const [homeOffice, setHomeOffice] = useState(filters.homeOffice);

  const handleFilter = () => {
    dispatch(
      setFilters({
        ...filters,
        minWage: minWage,
        maxWage: maxWage,
        jobType: jobType,
        location: location,
        homeOffice: homeOffice,
      })
    );
  };

  const handleInput = (event) => {
    const value = event.target.value;
    if (event.target.id === "min") {
      setMinWage(Number(value));
      if (Number(value) > maxWage) {
        setMaxWage(Number(value));
      }
    } else if (event.target.id === "max") {
      setMaxWage(Number(value));
      if (Number(value) < minWage) {
        setMinWage(Number(value));
      }
    } else if (event.target.id === "location") {
        setLocation(value);
    } else if (event.target.id === "jobType") {
        setJobType(value);
    }

  };
  const toWage = (input) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(input * 20000);
  };
  return (
    <div className="drawer drawer-end max-w-16">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Filter
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-8 pt-16 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-start gap-4">
          {/* Sidebar content here */}
          <li>
            <p className=" pl-0">Fizetési sáv alja: {toWage(minWage)}</p>
            <input
              type="range"
              id="min"
              min={0}
              max="100"
              value={minWage}
              onChange={handleInput}
              className="range range-primary"
            />
          </li>
          <li>
            <p className=" pl-0">Fizetési sáv teteje: {toWage(maxWage)}</p>
            <input
              type="range"
              id="max"
              min={0}
              max="100"
              value={maxWage}
              onChange={handleInput}
              className="range range-primary"
            />
          </li>
          <li>
            <p className=" pl-0">Foglalkozás típusa:</p>
            <select
              className="select select-primary w-full"
              id="jobType"
              value={jobType}
              onChange={handleInput}
            >
              <option className=" bg-neutral">Összes</option>
              <option className=" bg-neutral">Full-Time</option>
              <option className=" bg-neutral">Part-Time</option>
              <option className=" bg-neutral">Internship</option>
              <option className=" bg-neutral">Contract</option>
            </select>
          </li>
          <li>
            <p className=" pl-0">Település</p>
            <label className="input input-bordered input-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                width="24px"
                height="24px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 4.4 9.69 6.11 11.7.38.48 1.1.48 1.48 0C14.6 18.69 19 13.25 19 9c0-3.87-3.13-7-7-7zm0 10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Bárhol"
                id="location"
                onInput={handleInput}
                value={location}
              />
            </label>
          </li>
          <li>
            <label className="label cursor-pointer">
              <span className="label-text">Home Office lehetőség</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={homeOffice}
                onChange={() => setHomeOffice(!homeOffice)}
              />
            </label>
          </li>
          <li>
            <button className=" btn btn-primary drawer-open" onClick={handleFilter}>
              Apply
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
