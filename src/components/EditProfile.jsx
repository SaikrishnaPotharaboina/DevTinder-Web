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


        <div className="flex justify-center my-10">
            <div className="flex justify-center mx-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">First Name:</label>
                                <input type="email" id="name" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Last Name:</label>
                                <input type="" id="name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">Age:</label>
                                <input type="" id="name" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">gender:</label>
                                <input type="" id="name" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">PhotoUrl:</label>
                                <input type="" id="name" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>

                            <fieldset className="fieldset">
                                <label className="label" htmlFor="name">About:</label>
                                <input type="" id="name" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                            </fieldset>

                        </div>
                        <p className="text-red-500">{error}</p>
                        <div className="card-actions  justify-center">
                            <button className="btn btn-primary " onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
            {showTost &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-info">
                        <span>Profile was Saved successfully!</span>
                    </div>
                </div>
            }

        </div>
    )
}

export default EditProfile
