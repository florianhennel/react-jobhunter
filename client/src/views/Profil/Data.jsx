import { useSelector } from "react-redux";

export default function Data({title}){
    const { id, email, fullname, role } = useSelector((state) => state.auth.user);
    return(
        <div className=" flex w-full">
            <div className=" w-64 flex justify-start">{title}</div>
            {title==="Név"&& <div>{fullname}</div>}
            {title==="Email"&& <div>{email}</div>}
            {title==="Státusz"&& <div>{role==="jobseeker"?"Munkakereső":"Munkáltató"}</div>}
        </div>
    )
}