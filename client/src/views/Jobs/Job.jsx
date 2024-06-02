import { useEffect } from "react";

export default function Job({ details }) {
  const {
    id,
    company,
    position,
    description,
    salaryFrom,
    salaryTo,
    type,
    city,
    homeOffice,
    userId,
  } = details;
  const formatCurrency = (number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(number);
  };
  return (
    <div className="card card-compact w-1/2 bg-neutral shadow-xl">
      <div className="card-body flex-row justify-between">
        <div className="flex flex-col justify-between">
          <h2 className="card-title">{position}</h2>
          <div className=" self-start">{city}</div>
        </div>
        <div className=" flex flex-col justify-between">
          <div className=" italic ">
            {formatCurrency(salaryFrom)} - {formatCurrency(salaryTo)}
          </div>
          <div className=" capitalize self-end">{type}</div>
        </div>
      </div>
    </div>
  );
}
