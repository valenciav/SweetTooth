import React, { useContext } from 'react'
import { AuthContext } from './AuthContext';

const ProtectedRoutes = ({ children }) => {
	let path = location.pathname;
	const protectedPaths = ["/bookmark", "/createRecipe"];
	const { isAuthenticated } = useContext(AuthContext);

	if(!isAuthenticated && protectedPaths.find((protectedPath) => protectedPath == path)) {
		path = '/signIn';
	}
	else return children;
}

export default ProtectedRoutes;