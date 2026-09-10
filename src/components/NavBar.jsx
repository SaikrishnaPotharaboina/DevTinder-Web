import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js"
import { removeUser } from "../utils/userSlice.js";


export function NavBar() {


    const user = useSelector((store) => store.user?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            {user && <div className="flex gap-2">
                <div className="flex items-center">
                    <span>Welcome, {user.firstName}</span>
                </div>
                <div className="dropdown dropdown-end px-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User photoUrl"
                                src={user?.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogOut}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    );
}
