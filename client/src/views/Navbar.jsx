import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../state/authSlice";

export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
    const role = isAuthenticated?useSelector((state)=>state.auth.user.role):null;
    const handleLogout = ()=>{
        dispatch(logout());
    }
    return(
        <div className="navbar bg-neutral flex pl-4 gap-2 w-full">
            <Link className="btn btn-ghost text-xl">Jobhunter</Link>
            <div className={`gap-2 ${isAuthenticated?"hidden":"visible"}`}>
                <Link className="btn btn-ghost text-xl" to={"/register"}>Regisztáció</Link>
                <Link className="btn btn-ghost text-xl" to={"/login"}>Bejelentkezés</Link>
            </div>
            <div className={`${isAuthenticated?"visible":"hidden"}`}>
                <Link className="btn btn-ghost text-xl">Profil</Link>
                <Link className={`btn btn-ghost text-xl ${role === "company"?"visible":"hidden"}`}>Álláshirdetés</Link>
                <Link className="btn btn-ghost text-xl" onClick={handleLogout}>Kijelentkezés</Link>
            </div>
            
        </div>
    )
}