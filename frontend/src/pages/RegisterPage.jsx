import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user';

const RegisterPage = () => {
	const navigate = useNavigate();
	const { login } = useUserStore();

	const [credentials, setCredentials] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errors, setErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const constraints = {
		username: {
			min: 3,
			max: 40,
			regex: /^[a-zA-Z0-9._]+$/,
			regexMsg: 'Username can not contain blank spaces or special characters'
		},
		email: {
			min:5,
			max: 255,
			regex: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
			regexMsg: 'Email is invalid'
		},
		password: {
			min: 8,
			max: 40,
			regex: /(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])/,
			regexMsg: 'Password must contain at least a lowercase, an uppercase, and a number'
		}
	}

	const validate = (name, value) => {
		if(value === '') {
			setErrors({...errors, [name]: ''});
			return false;
		}
		if(name === 'confirmPassword') {
			if(value !== credentials.password) setErrors({...errors, [name]: 'Passwords do not match'})
			else setErrors({...errors, [name]: ''})
			return false;
		}
		if(value.length < constraints[name].min) {
			setErrors({...errors, [name]: `${name.charAt(0).toUpperCase()+name.substring(1)} is too short`});
			return false;
		}
		if(value.length > constraints[name].max) {
			setErrors({...errors, [name]: `${name.charAt(0).toUpperCase()+name.substring(1)} exceeds the character limit`});
			return false;
		}
		if(!(constraints[name].regex).test(value)) {
			setErrors({...errors, [name]: constraints[name].regexMsg});
			return false;
		}
		setErrors({...errors, [name]: ''});
		return true;
	}

	const checkUsernameAvailability = async (value) => {
		const res = await fetch(`/api/users/getByUsername/${value}`);
		const user = await res.json();
		if(user.data) {
			setErrors({...errors, username: `Username is unavailable`});
			return;
		}
		setErrors({...errors, username: ''});
	}

	const checkEmailAvailability = async (value) => {
		const res = await fetch(`/api/users/getByEmail/${value}`);
		const user = await res.json();
		if(user.data) {
			setErrors({...errors, email: `Email is already registered`});
			return;
		}
		setErrors({...errors, email: ''});
	}

	const handleChange = async (e) => {
		const { name, value} = e.target;
		setCredentials({ ...credentials, [name]: value});
		if(validate(name, value)) {
			if(name === 'username') checkUsernameAvailability(value);
			else if(name === 'email') checkEmailAvailability(value);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(!credentials.username || !credentials.email || !credentials.password || !credentials.confirmPassword ||
			errors.username || errors.email || errors.password || errors.confirmPassword) return;
		const userRes = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		const newUser = await userRes.json();
		if(!newUser.success) {
			console.log('An error has occured')
			return;
		}
		console.log("Successfully created account");
		const signInRes = await fetch('/api/auth/signIn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				email: credentials.email,
				password: credentials.password
			}
		})
		const result = await signInRes.json();
		if(!result.success) {
			console.log('Failed to log in');
			navigate('/signIn');
			return;
		}
		login(credentials);
		console.log("Successfully logged in")
		navigate(-1);
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<form className='form' id='registrationForm'>
				<div className='text-center'>
					<h3>Welcome to SweetTooth!</h3>
					<span className='text-xs'>Already have an account? Sign In <a href="/signIn" className='text-[var(--secondary)]'>here!</a></span>
				</div>
				<div className='flex flex-col gap-8'>
					<div className='form-control'>
						<label htmlFor='username'>Username</label>
						<input type='text' name='username' onChange={handleChange}/>
						<small>{errors.username}</small>
					</div>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<input type='text' name='email' onChange={handleChange}/>
						<small>{errors.email}</small>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input type='password' name='password' onChange={handleChange}/>
						<small>{errors.password}</small>
					</div>
					<div className='form-control'>
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<input type='password' name='confirmPassword' onChange={handleChange}/>
						<small>{errors.confirmPassword}</small>
					</div>
				</div>
				{/* <small>{errorMessage}</small> */}
				<button type='submit' className='btn' onClick={handleSubmit}>Sign Up</button>
			</form>
		</div>
	)
}

export default RegisterPage