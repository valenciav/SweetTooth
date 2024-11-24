import React, { createContext, useEffect, useState } from 'react'
import { useUserStore } from '../store/user';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [authenticated, setauthenticated] = useState(null);
	const { fetchUserData } = useUserStore();

	useEffect(() => {
		const getUser = async () => {
			const res = await fetchUserData();
			if(res.success) setauthenticated(res.data);
		}
		getUser();
  }, [fetchUserData]);
	
	return (
		<AuthContext.Provider value={{ authenticated }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider };