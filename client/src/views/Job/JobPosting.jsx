import { useSelector } from "react-redux";
import { useGetOneJobQuery } from "../../state/jobsApiSlice";
import { useNavigate, useParams } from "react-router";
import Navbar from "../Navbar";
import JobData from "../Job/JobData";
import { useApplyForJobMutation, useGetJobsForAnApplicantQuery } from "../../state/applicantsApiSlice";

export default function JobPosting() {
    const param = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector(state=>state.auth.user);
    const [applyApi] = useApplyForJobMutation();
    const {
        data: {
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
        } = {},
        isLoading,
        isError,
        isSuccess,
    } = useGetOneJobQuery({ id: param.id });
    const applications = useGetJobsForAnApplicantQuery({id:user.id, token:token});
    const alreadyApplied = applications.isSuccess && applications.data.find(a=>a.jobId===id) !== undefined;
    const handleApply = () => {
        applyApi({
            body: {
                jobId: Number(param.id),
            },
            token: token,
        });
        document.getElementById('apply_modal').showModal();
    };
    return (
        <div className="w-full h-screen">
            <Navbar />
            <div className=" flex justify-center items-center h-full">
                <div className="card bg-neutral shadow-xl w-1/2">
                    <div className="card-body">
                        <div className=" flex justify-between">
                            <div>
                                <h2 className="card-title">Állás részletei</h2>
                                <h3>
                                    Megtetszett a lehetőség? Jelentkezz még ma!
                                </h3>
                                <dialog id="apply_modal" className="modal">
                                    <div className="modal-box">
                                        <p className="py-4">
                                            Sikeresen jelentkeztél az állásra
                                        </p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className={"btn btn-success"}>
                                                    Ok
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                            <button
                                className={` btn btn-primary ${
                                    user.role === "jobseeker" ? "visible" : "hidden"
                                }`}
                                onClick={handleApply}
                                disabled={alreadyApplied}
                            >
                                {alreadyApplied?"Már jelentkeztél":"Jelentkezés"}
                            </button>
                        </div>

                        <div className="divider"></div>
                        <div className=" flex flex-col items-start gap-8">
                            <JobData title={"Név"} value={company + " Kft."} />
                            <JobData title={"Pozíció"} value={position} />
                            <JobData title={"Leírás"} value={description} />
                            <JobData
                                title={"Fizetési sáv"}
                                value={`${format(salaryFrom)} - ${format(
                                    salaryTo
                                )}`}
                            />
                            <JobData
                                title={"Foglalkozás típusa"}
                                value={type}
                            />
                            <JobData title={"Település"} value={city} />
                            <JobData
                                title={"Home Office"}
                                value={homeOffice ? "Van" : "Nincs"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const format = (input) => {
    return new Intl.NumberFormat("hu-HU", {
        style: "currency",
        currency: "HUF",
        maximumFractionDigits: 0,
    }).format(input);
};
