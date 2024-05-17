import {useLoginMutation} from "../../state/authApiSlice.js";
import {useDispatch} from "react-redux";
import {login} from "../../state/authSlice.js";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [apiLogin] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <button onClick={() => {
        apiLogin({
            body: {
                "email": "user1@grafilogika.hu",
                "password": "user1"
            }
        })
        //     .unwrap().then(data => {
        //     dispatch(login(data))
        // })
            .then(() => navigate("/"))
    }}>Login</button>
}