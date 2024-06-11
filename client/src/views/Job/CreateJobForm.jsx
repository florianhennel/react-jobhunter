import { useState } from "react";
import EditJobInput from "../Profil/EditJobInput";
import { useDispatch, useSelector } from "react-redux";
import {
    useCreateJobMutation,
    useModifyJobMutation,
} from "../../state/jobsApiSlice";
import { inputErrors } from "../../state/inputErrorSlice";

export default function CreateJobForm({ details }) {
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
    } = details || {};
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [apiModifyJob] = useModifyJobMutation();
    const [apiCreateJob] = useCreateJobMutation();
    const [jobType, setJobType] = useState(type ? type : "Full-Time");
    const [jobCompany, setJobCompany] = useState(company ? company : "");
    const [title, setTitle] = useState(position ? position : "");
    const [minSalary, setMinSalary] = useState(salaryFrom ? salaryFrom : 0);
    const [maxSalary, setMaxSalary] = useState(salaryTo ? salaryTo : 0);
    const [jobDescription, setJobDescription] = useState(
        description ? description : ""
    );
    const [location, setLocation] = useState(city ? city : "");
    const [homeOfficeAvailable, setHomeOfficeAvailable] = useState(
        homeOffice ? homeOffice : "false"
    );
    const handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        if (target.name === "Company") {
            setJobCompany(value);
        } else if (target.name === "Position") {
            setTitle(value);
        } else if (target.name === "Salary from") {
            setMinSalary(Number(value * 20000));
            if (Number(value * 20000) > maxSalary) {
                setMaxSalary(Number(value * 20000));
            }
        } else if (target.name === "Salary to") {
            setMaxSalary(Number(value * 20000));
            if (Number(value * 20000) < minSalary) {
                setMinSalary(Number(value * 20000));
            }
        } else if (target.name === "Job type") {
            setJobType(value);
        } else if (target.name === "City") {
            setLocation(value);
        } else if (target.name === "Description") {
            setJobDescription(value);
        } else if (target.name === "Home Office") {
            setHomeOfficeAvailable(homeOfficeAvailable === 1 ? 0 : 1);
        }
    };
    const handleSave = (event) => {
        event.preventDefault();
        const form = event.target.closest("form");
        if (event.nativeEvent.submitter.value === "cancel") {
            form.submit();
            dispatch(
                inputErrors({ noCompany: false, noTitle: false, noCity: false })
            );
            return;
        }
        let errors = {
            noCompany: jobCompany === "",
            noTitle: title === "",
            noCity: location === "",
        };
        if (Object.values(errors).some((e) => e === true)) {
            console.log(errors);
            dispatch(inputErrors({ ...errors }));
        } else {
            if (details) {
                apiModifyJob({
                    id: id,
                    token: token,
                    body: {
                        company: jobCompany,
                        position: title,
                        description: jobDescription,
                        salaryFrom: minSalary,
                        salaryTo: maxSalary,
                        type: jobType.toLowerCase(),
                        city: location,
                        homeOffice: homeOfficeAvailable ? true : false,
                    },
                });
            } else {
                apiCreateJob({
                    token: token,
                    body: {
                        company: jobCompany,
                        position: title,
                        description: jobDescription,
                        salaryFrom: minSalary,
                        salaryTo: maxSalary,
                        type: jobType.toLowerCase(),
                        city: location,
                        homeOffice: homeOfficeAvailable ? true : false,
                    },
                });
            }
            form.submit();
            dispatch(
                inputErrors({ noCompany: false, noTitle: false, noCity: false })
            );
        }
    };
    return (
        <dialog
            id={details === null ? "create_job_modal" : `edit_modal_${id}`}
            className="modal"
        >
            <form onSubmit={handleSave} method="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        {details !== null
                            ? "Hirdetés szerkesztése!"
                            : "Hirdetés feltöltése!"}
                    </h3>
                    <div className=" flex flex-col gap-4 pt-6">
                        <EditJobInput
                            type="text"
                            value={jobCompany}
                            input={handleInput}
                            name="Company"
                        />
                        <EditJobInput
                            type="text"
                            value={title}
                            input={handleInput}
                            name="Position"
                        />
                        <EditJobInput
                            type="range"
                            value={minSalary}
                            input={handleInput}
                            name="Salary from"
                        />
                        <EditJobInput
                            type="range"
                            value={maxSalary}
                            input={handleInput}
                            name="Salary to"
                        />
                        <EditJobInput
                            type="select"
                            value={jobType}
                            input={handleInput}
                            name="Job type"
                        />
                        <EditJobInput
                            type="text"
                            value={location}
                            input={handleInput}
                            name="City"
                        />
                        <EditJobInput
                            type="textarea"
                            value={jobDescription}
                            input={handleInput}
                            name="Description"
                        />
                        <EditJobInput
                            type="checkbox"
                            value={homeOfficeAvailable}
                            input={handleInput}
                            name="Home Office"
                        />
                    </div>
                    <div className="modal-action">
                        <button className=" btn btn-ghost" value="cancel">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </dialog>
    );
}
