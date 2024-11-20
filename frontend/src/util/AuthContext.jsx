import React, { createContext, useEffect, useState } from 'react'
import { useUserStore } from '../store/user';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { fetchUserData } = useUserStore();

	useEffect(() => {
		const getUser = async () => {
			const res = await fetchUserData();
			if(res.success) setIsAuthenticated(true);
		}
		getUser();
  }, [fetchUserData]);
	
	return (
		<AuthContext.Provider value={{ isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider };