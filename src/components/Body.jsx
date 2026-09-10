import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";


const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user?.data);

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                { withCredentials: true }
            );

            dispatch(addUser(res?.data));
        } catch (error) {
            if (error.response?.status === 401) {
                navigate("/login");
            }
            console.error(error);
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Body
