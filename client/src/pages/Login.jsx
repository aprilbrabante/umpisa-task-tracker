import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import AppInput from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';

import api from '../api';

export default function Login() {

	const navigate = useNavigate();

	const user = useContext(UserContext);

	const [isRegister, setIsRegister] = useState(false);

	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	const [error, setError] = useState('');

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const submit = async () => {

		setError('');

		try {

			const route = isRegister ? 'register' : 'login';

			const res = await api.post(`/users/${route}`, form);

			user.setNewToken(res.data.access || res.data.token);

			navigate('/dashboard');

		} catch (err) {

			setError(err.response?.data?.error || 'Something went wrong');
			console.log(err);
		}
	};

	useEffect(() => {

		if (user.token) {
			navigate('/dashboard');
		}
	}, [user.token]);

		return (

		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

			<div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>

				<h4 className="mb-3 text-center">
					{isRegister ? 'Register' : 'Login'}
				</h4>

				<form onSubmit={(e) => {
					e.preventDefault();
					submit();
				}}>

					<AppInput
						label="Email"
						type="email"
						name="email"
						value={form.email}
						onChange={handleChange}
						placeholder="Enter email"
						required
					/>

					<AppInput
						label="Password"
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						placeholder="Enter password"
						required
					/>

					<AppButton
						label={isRegister ? "Register" : "Login"}
						variant="success"
						className="w-100"
						type="submit"
					/>

				</form>

				<div className="mt-3 text-center">

					<button className="btn btn-link text-success" onClick={() => navigate("/register")}>
						{isRegister
							? 'Already have an account?'
							: 'Need an account?'}
					</button>

				</div>

				{error && (
					<p className="text-danger text-center mt-2">
					{error}
					</p>
				)}

			</div>

		</div>
	);
}