import { useState } from "react";
import {
  useDeleteJobMutation,
  useModifyJobMutation,
} from "../../state/jobsApiSlice";
import { useGetApplicantsForAJobQuery } from "../../state/applicantsApiSlice";
import { useSelector } from "react-redux";
import CreateJobForm from "../Job/CreateJobForm";

export default function OwnJob({ details }) {
  const token = useSelector((state) => state.auth.token);
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
  
  const [showApplicants, setShowApplicants] = useState(false);
  const [apiDeleteJob] = useDeleteJobMutation();
  const { data, isLoading, isError, isSuccess } = useGetApplicantsForAJobQuery(
    { id: id, token: token },
    { skip: !showApplicants }
  );
  return (
    <div className=" card card-compact bg-neutral w-full">
      <div className="card card-body flex-row justify-between">
        <div className="flex flex-col justify-between">
          <h2 className="card-title capitalize">{position}</h2>
          <div className=" self-start flex gap-6">
            <div className=" capitalize italic">{type}</div>
            <div>
              {formatCurrency(salaryFrom)} - {formatCurrency(salaryTo)}
            </div>
            <div>{city}</div>
          </div>
        </div>
        <div className=" flex flex-row gap-2 justify-between">
          <button
            className=" btn btn-success"
            onClick={() => document.getElementById(`edit_modal_${id}`).showModal()}
          >
            Szerkesztés
          </button>
          <button
            className=" btn btn-info"
            onClick={() => {
              setShowApplicants(true);
              document.getElementById(`applicants_modal_${id}`).showModal();
            }}
          >
            Megtekintés
          </button>
          <button
            className=" btn btn-error"
            onClick={() => apiDeleteJob({ id: id, token: token })}
          >
            Törlés
          </button>
        </div>
        <CreateJobForm key={id} details={details} />
        <dialog id={`applicants_modal_${id}`} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              Hirdetésre jelentkezők ({position})
            </h3>
            <div>
              {(data &&data.length>0)?
                data.map((application, index) => (
                  <p key={index}>
                    {index + 1 + ". " + application.user.fullname}
                  </p>
                )):<div>No applicants yet...</div>}
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
export const formatCurrency = (number) => {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(number);
};
