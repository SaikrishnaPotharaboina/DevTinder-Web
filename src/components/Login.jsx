

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


function Login() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isLoginForm, setIsLoginForm] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate("")
	const [error, setError] = useState();



	const handleLogin = async () => {
		try {
			const res = await axios.post(BASE_URL + "/login", {
				email,
				password

			}, { withCredentials: true });
			dispatch(addUser(res.data));
			return navigate("/")

		} catch (error) {
			console.log("Login error:", error.response?.data);

			setError(error.response?.data || "Something went wrong");
		};

	}

	const handleSingUp = async () => {
		try {
			const res = await axios.post(BASE_URL + "/singUp", { firstName, lastName, email, password }, { withCredentials: true });
			dispatch(addUser(res.data));
			return navigate("/profile")
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="flex justify-center my-15">
			<div className="card card-border bg-base-100 w-96">
				<div className="card-body">
					<h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sing Up"}</h2>
					<div>
						{!isLoginForm &&
							<>
								<fieldset className="fieldset">
									<label className="label" htmlFor="name">First Name</label>
									<input type="name" id="name" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
								</fieldset>
								<fieldset className="fieldset">
									<label className="label" htmlFor="name">LastName</label>
									<input type="name" id="name" className="input" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
								</fieldset>
							</>
						}
						<fieldset className="fieldset">
							<label className="label" htmlFor="name">Email</label>
							<input type="email" id="name" className="input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</fieldset>
						<fieldset className="fieldset">
							<label className="label" htmlFor="name">Password</label>
							<input type="password" id="name" className="input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</fieldset>
					</div>
					<p className="text-red-500">{error}</p>
					<div className="card-actions  justify-center">
						<button className="btn btn-primary " onClick={isLoginForm ? handleLogin : handleSingUp}>{isLoginForm ? "Login" : "singUp"}</button>
					</div>
					<p
						className="m-auto cursor-pointer text-blue-500 hover:text-blue-700"
						onClick={() => setIsLoginForm((value) => !value)}
					>
						{!isLoginForm
							? "Existing User? Login Here"
							: "New User? Sign Up Here"}
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
