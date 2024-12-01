import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../util/useAuth';

const SignInPage = () => {	
	const navigate = useNavigate();
	const { logIn } = useAuth();

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
		if(!credentials.email || !credentials.password) return;
		const res = await logIn(credentials);
		if(res.success) {
			logIn();
			navigate('/');
		}
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<form className='form'>
				<div className='text-center'>
					<h3>Glad to see you at SweetTooth!</h3>
					<span className='text-xs'>Don&apos;t have an account yet? Create one <Link to="/register" className='text-secondary'>here!</Link></span>
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