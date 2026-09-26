import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice"

function Requests() {
    const dispatch = useDispatch();
    const request = useSelector((store) => store.request);

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            console.log(res);
            dispatch(removeRequest(_id));

        } catch (error) {
            console.log(error)
        }
    }


    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
            dispatch(addRequest(res.data.data))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);

    if (!request) return null;

    if (request.length === 0) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
                <div className="text-center">

                    <div className="text-6xl mb-4">
                        👥
                    </div>

                    <h1 className="text-2xl font-bold text-base-content mb-2">
                        No Requests
                    </h1>

                    <p className="text-base-content/60">
                        You don't have any connection requests yet.
                    </p>

                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">

            <h1 className="text-3xl font-bold text-center mb-8">
                My Requests
            </h1>

            <div className="flex flex-wrap justify-center gap-6">

                {request.map((requests) => {

                    const {
                        firstName,
                        lastName,
                        age,
                        gender,
                        photoUrl,
                        about,
                    } = requests.fromUserId;

                    return (
                        <div
                            key={requests._id}
                            className="card w-96 bg-base-100 shadow-xl"
                        >

                            <figure className="px-6 pt-6">
                                <img
                                    src={photoUrl}
                                    alt={`${firstName} ${lastName}`}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </figure>

                            <div className="card-body">

                                <h2 className="card-title">
                                    {firstName} {lastName}
                                </h2>

                                <p>
                                    {age} {gender && `• ${gender}`}
                                </p>

                                <p className="text-base-content/70">
                                    {about}
                                </p>

                                <div className="card-actions justify-end mt-4">

                                    <button className="btn btn-success" onClick={() => reviewRequest("accepted", requests._id)}>
                                        Accept
                                    </button>

                                    <button className="btn btn-error" onClick={() => reviewRequest("rejected", requests._id)}>
                                        Reject
                                    </button>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Requests;
