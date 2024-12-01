import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [authenticated, setAuthenticated] = useState(null);
	const [loading, setLoading] = useState(true);	

	const logIn = async (user) => {		
		if(!user.email || !user.password) return;
		try {
			const res = await fetch('http://localhost:5000/signIn', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(user)
			}).then((response) => response.json());
			if(res.success) setAuthenticated(res.data);
			return { success: res.success, message: res.message };
		} catch (error) {
			console.log(error);
			return { success: false, message: 'Failed to log in' };
		}		
	}
	const logOut = async () => {		
		const res = await fetch('http://localhost:5000/signOut', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			credentials: 'include'
		}).then((response) => response.json());
		if(res.success) {
			setAuthenticated(null);
			return { success: true, message: "Successfully logged out" };
		}
	}

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch ('http://localhost:5000', {
					credentials: 'include'
				}).then((response) => response.json());
				if(res.success) {
					setAuthenticated(res.data);
				}
				else setAuthenticated(null);
			} catch (error) {
				console.log(error);
				setAuthenticated(null);
			} finally {
				setLoading(false);
			}
		}
		getUser();
  }, []);
	
	return (
		<AuthContext.Provider value={{ authenticated, loading, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider };