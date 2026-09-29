import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

function UserCard({ user }) {
    const dispatch = useDispatch();
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleRequestSending = async (status, userId) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true })
            dispatch(removeFeed(userId));

        } catch (error) {
            console.log(
                "Interested request failed:",
                error.response?.data || error.message
            );
        }
    }

    // const handleIgnore = () => {
    //     dispatch(ignore());

    //     RequestSending("ignored", _id);
    // };

    // const handleInterested = () => {
    //     dispatch(interested(user));

    //     RequestSending("interested", _id);
    // };


    const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

    return (
        <div className="my-15 flex justify-center items-center">
            <div className="card bg-base-300 w-85 shadow-sm">
                <figure>
                    <img
                        src={photoUrl}
                        alt="photo"
                    />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">
                        {firstName} {lastName}
                    </h2>

                    {age && gender && (
                        <p>{age}, {gender}</p>
                    )}

                    <p>{about}</p>

                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={() => { handleRequestSending("ignored", _id) }} >
                            Ignore
                        </button>

                        <button className="btn btn-secondary" onClick={() => { handleRequestSending("interested", _id) }} >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserCard;
