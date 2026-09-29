import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice"

export const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
                <div className="text-center">

                    <div className="text-6xl mb-4">
                        👥
                    </div>

                    <h1 className="text-2xl font-bold text-base-content mb-2">
                        No Connections
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

            {/* Page Header */}
            <div className="max-w-7xl mx-auto text-center mb-10">

                <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">
                    Your Network
                </p>

                <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                    My Connections
                </h1>

                <p className="text-base-content/60 mt-3">
                    People you're connected with
                </p>

            </div>


            {/* Connections Grid */}
            <div className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
        ">

                {connections.map((connection) => {

                    const {
                        firstName,
                        lastName,
                        age,
                        gender,
                        photoUrl,
                        about,
                    } = connection;

                    return (

                        <div
                            key={connection._id}
                            className="
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-base-100
                            border
                            border-base-300
                            shadow-sm
                            hover:shadow-2xl
                            hover:-translate-y-2
                            transition-all
                            duration-300
                        "
                        >

                            {/* Gradient Header */}
                            <div className="
                            h-24
                            bg-gradient-to-r
                            from-primary
                            via-secondary
                            to-accent
                            relative
                        ">

                                {/* Connected Badge */}
                                <div className="
                                absolute
                                top-4
                                right-4
                                flex
                                items-center
                                gap-2
                                bg-base-100/90
                                backdrop-blur-md
                                px-3
                                py-1.5
                                rounded-full
                                text-xs
                                font-semibold
                                shadow
                            ">

                                    <span className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-success
                                "></span>

                                    Connected

                                </div>

                            </div>


                            {/* Profile Image */}
                            <div className="
                            relative
                            flex
                            justify-center
                        ">

                                <div className="
                                absolute
                                -top-14
                                w-28
                                h-28
                                rounded-full
                                bg-base-100
                                p-1.5
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
                                        group-hover:scale-105
                                        transition-transform
                                        duration-300
                                    "
                                    />

                                </div>

                            </div>


                            {/* Card Content */}
                            <div className="pt-18 px-6 pb-6">

                                {/* Name */}
                                <div className="text-center">

                                    <h2 className="
                                    text-xl
                                    font-bold
                                    truncate
                                    group-hover:text-primary
                                    transition-colors
                                ">
                                        {firstName} {lastName}
                                    </h2>

                                    {/* Age / Gender */}
                                    {(age || gender) && (
                                        <p className="
                                        text-sm
                                        text-base-content/60
                                        mt-1
                                    ">
                                            {age && `${age} years`}
                                            {age && gender && " • "}
                                            {gender}
                                        </p>
                                    )}

                                </div>


                                {/* About */}
                                <div className="
                                mt-5
                                rounded-2xl
                                bg-base-200
                                p-4
                                min-h-24
                                flex
                                items-center
                                justify-center
                            ">

                                    <p className="
                                    text-sm
                                    text-base-content/70
                                    text-center
                                    leading-relaxed
                                    line-clamp-3
                                ">
                                        {about || "No bio available"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    );
                })}

            </div>


            {/* Empty State */}
            {connections.length === 0 && (
                <div className="
                max-w-md
                mx-auto
                text-center
                mt-20
                bg-base-100
                rounded-3xl
                p-10
                shadow-lg
                border
                border-base-300
            ">

                    <div className="text-5xl mb-4">
                        🤝
                    </div>

                    <h2 className="text-2xl font-bold">
                        No Connections Yet
                    </h2>

                    <p className="text-base-content/60 mt-2">
                        Start connecting with developers to build your network.
                    </p>

                </div>
            )}

        </div>
    );


};
