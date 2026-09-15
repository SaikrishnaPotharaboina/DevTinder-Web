import { useState } from "react";
import UserCard from "./UserCard"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";




function EditProfile({ user }) {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [error, setError] = useState();
    const [showTost, setShowTost] = useState(false)
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("")

        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age: Number(age),
                    gender,
                    photoUrl,
                    about,
                },
                {
                    withCredentials: true,
                }
            );


            dispatch(addUser(res?.data?.user));
            setShowTost(true);

            setTimeout(() => {
                setShowTost(false)
            }, 2000);


        } catch (error) {
            console.log("ERROR:", error.response?.data);
            setError(error.response?.data?.message || "Something went wrong");
        }
    };


    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">

            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-5xl mx-auto">

                {/* Edit Profile */}
                <div className="card bg-base-100 w-full max-w-md shadow-lg border border-base-300">
                    <div className="card-body">

                        <h2 className="text-2xl font-semibold text-center mb-6">
                            Edit Profile
                        </h2>

                        <div className="space-y-4">

                            <fieldset className="fieldset">
                                <label className="label text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    type="email"
                                    id="name"
                                    className="input input-bordered w-full"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-sm font-medium">
                                    Last Name
                                </label>
                                <input
                                    type=""
                                    id="name"
                                    className="input input-bordered w-full"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </fieldset>

                            <div className="grid grid-cols-2 gap-4">

                                <fieldset className="fieldset">
                                    <label className="label text-sm font-medium">
                                        Age
                                    </label>
                                    <input
                                        type=""
                                        id="name"
                                        className="input input-bordered w-full"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label text-sm font-medium">
                                        Gender
                                    </label>
                                    <input
                                        type=""
                                        id="name"
                                        className="input input-bordered w-full"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>

                            </div>

                            <fieldset className="fieldset">
                                <label className="label text-sm font-medium">
                                    Photo URL
                                </label>
                                <input
                                    type=""
                                    id="name"
                                    className="input input-bordered w-full"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label text-sm font-medium">
                                    About
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full h-24 resize-none"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </fieldset>

                        </div>

                        <p className="text-error text-sm text-center mt-3">
                            {error}
                        </p>

                        <button
                            className="btn btn-primary w-full mt-4"
                            onClick={saveProfile}
                        >
                            Save Profile
                        </button>

                    </div>
                </div>

                {/* Profile Preview */}
                <div className="w-full max-w-sm">

                    <p className="text-center text-sm font-medium text-base-content/60 mb-3">
                        Profile Preview
                    </p>

                    <UserCard
                        user={{
                            firstName,
                            lastName,
                            age,
                            gender,
                            photoUrl,
                            about
                        }}
                    />

                </div>

            </div>

            {/* Toast */}
            {showTost && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success shadow-lg">
                        <span>Profile was Saved successfully!</span>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EditProfile
