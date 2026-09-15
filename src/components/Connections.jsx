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

    if (connections.length === 0) return <h1>No Connections Found</h1>


    return (
        <div className="min-h-screen bg-base-200 px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">
                My Connections
            </h1>

            <div className="flex flex-wrap justify-center gap-6">
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
                            className="card bg-base-100 w-80 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                        >
                            <figure className="px-4 pt-4">
                                <img
                                    src={photoUrl}
                                    alt={`${firstName} ${lastName}`}
                                    className="h-64 w-full object-cover rounded-xl"
                                />
                            </figure>

                            <div className="card-body">
                                <h2 className="card-title text-xl">
                                    {firstName} {lastName}
                                </h2>

                                <p className="text-sm text-base-content/70">
                                    {age} years • {gender}
                                </p>

                                <p className="text-sm mt-2 line-clamp-3">
                                    {about}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );


};
