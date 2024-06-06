import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../state/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const role = user ? user.role : null;
  return (
    <div className="navbar bg-neutral flex pl-4 gap-2 w-full">
      <Link className="btn btn-ghost text-xl" to={"/"}>Jobhunter</Link>
      <div className={`gap-2 ${isAuthenticated ? "hidden" : "visible"}`}>
        <Link className="btn btn-ghost text-xl" to={"/register"}>
          Regisztáció
        </Link>
        <Link className="btn btn-ghost text-xl" to={"/login"}>
          Bejelentkezés
        </Link>
      </div>
      <div className={`${isAuthenticated ? "visible" : "hidden"}`}>
        <Link className="btn btn-ghost text-xl" to={"/profil"}>Profil</Link>
        <Link
          className={`btn btn-ghost text-xl ${
            role === "company" ? "visible" : "hidden"
          }`}
        >
          Álláshirdetés
        </Link>
        <Link
          className="btn btn-ghost text-xl"
          onClick={() => dispatch(logout())}
        >
          Kijelentkezés
        </Link>
      </div>
    </div>
  );
}
