

import axios from "axios";
import { useState } from "react";


function Login() {

	const [email, setEmail] = useState("satej@gmail.com");
	const [password, setPassword] = useState("Saikrishna@31");


	const handleLogin = async () => {
		try {
			const res = await axios.post("http://localhost:3000/login", {
				email,
				password

			}, { withCredentials: true });
		} catch (error) {
			console.error(error)
		}

	}
	return (
		<div className="flex justify-center my-15">
			<div className="card card-border bg-base-100 w-96">
				<div className="card-body">
					<h2 className="card-title justify-center">Login</h2>
					<div>
						<fieldset className="fieldset">
							<label className="label" htmlFor="name">Email:{email}</label>
							<input type="email" id="name" className="input" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						</fieldset>
						<fieldset className="fieldset">
							<label className="label" htmlFor="name">Password</label>
							<input type="password" id="name" className="input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</fieldset>
					</div>
					<div className="card-actions justify-end">
						<button className="btn btn-primary" onClick={(e) => handleLogin(e.target)}>Login</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
