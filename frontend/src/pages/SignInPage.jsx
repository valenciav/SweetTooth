import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

const SignInPage = () => {	
	const navigate = useNavigate();
	const { login } = useUserStore();

	const [credentials, setCredentials] = useState({
		email: '',
		password: ''
	});

	const handleChange = async (e) => {
		const { name, value} = e.target;
		setCredentials({ ...credentials, [name]: value});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		login(credentials);
		navigate(-1);
		setCredentials({
			email: '',
			password: ''
		})
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<form className='form'>
				<div className='text-center'>
					<h3>Glad to see you at SweetTooth!</h3>
					<span className='text-xs'>Don&apos;t have an account yet? Create one <a href="/register" className='text-secondary'>here!</a></span>
				</div>
				<div className='flex flex-col gap-8'>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<input type='text' name='email' onChange={handleChange}/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' onChange={handleChange}/>
					</div>
				</div>
				<button type="submit" className='btn' onClick={handleSubmit}>Sign In</button>
			</form>
		</div>
	)
}

export default SignInPage