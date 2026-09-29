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

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10 text-center">
                <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                    Connections
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                    My Requests
                </h1>

                <p className="text-base-content/60 mt-3">
                    People who are interested in connecting with you
                </p>
            </div>


            {/* Request Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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
                            className="
                            group
                            bg-base-100
                            rounded-3xl
                            border border-base-300
                            shadow-sm
                            hover:shadow-2xl
                            hover:-translate-y-1
                            transition-all
                            duration-300
                            overflow-hidden
                        "
                        >

                            {/* Top Gradient */}
                            <div className="h-24 bg-gradient-to-r from-primary/80 via-secondary/70 to-accent/70 relative">

                                {/* Online dot */}
                                <div className="
                                absolute
                                top-4
                                right-4
                                flex
                                items-center
                                gap-2
                                bg-base-100/90
                                backdrop-blur
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                            ">
                                    <span className="w-2 h-2 rounded-full bg-success"></span>
                                    Interested
                                </div>

                            </div>


                            {/* Profile Image */}
                            <div className="relative flex justify-center">

                                <div className="
                                absolute
                                -top-14
                                w-28
                                h-28
                                rounded-full
                                p-1
                                bg-base-100
                                shadow-xl
                            ">
                                    <img
                                        src={photoUrl}
                                        alt={`${firstName} ${lastName}`}
                                        className="
                                        w-full
                                        h-full
                                        rounded-full
                                        object-cover
                                    "
                                    />
                                </div>

                            </div>


                            {/* Content */}
                            <div className="pt-18 px-6 pb-6">

                                {/* Name */}
                                <div className="text-center">

                                    <h2 className="
                                    text-2xl
                                    font-bold
                                    group-hover:text-primary
                                    transition-colors
                                ">
                                        {firstName} {lastName}
                                    </h2>

                                    {/* Age / Gender */}
                                    <p className="text-sm text-base-content/60 mt-1">
                                        {age && `${age} years`}
                                        {age && gender && " • "}
                                        {gender}
                                    </p>

                                </div>


                                {/* About */}
                                <div className="
                                mt-5
                                bg-base-200
                                rounded-2xl
                                p-4
                                min-h-20
                            ">

                                    <p className="text-sm text-base-content/70 leading-relaxed text-center">
                                        {about || "No bio available"}
                                    </p>

                                </div>


                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            reviewRequest(
                                                "accepted",
                                                requests._id
                                            )
                                        }
                                        className="
                                        btn
                                        btn-success
                                        rounded-xl
                                        text-white
                                        shadow-md
                                        hover:scale-[1.02]
                                        transition
                                    "
                                    >
                                        ✓ Accept
                                    </button>

                                    <button
                                        onClick={() =>
                                            reviewRequest(
                                                "rejected",
                                                requests._id
                                            )
                                        }
                                        className="
                                        btn
                                        btn-error
                                        rounded-xl
                                        text-white
                                        shadow-md
                                        hover:scale-[1.02]
                                        transition
                                    "
                                    >
                                        ✕ Reject
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
