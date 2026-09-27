import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";



function Feed() {

    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch();
    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data))
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!feed || feed.length === 0) {
        return (
            <div className="flex justify-center mt-20">
                <h1 className="text-2xl font-bold">
                    No more profiles
                </h1>
            </div>
        );
    }
    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    )
}

export default Feed;




