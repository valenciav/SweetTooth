import React, { useContext } from 'react'
import { AuthContext } from './AuthContext';

const ProtectedRoutes = ({ children }) => {
	let path = location.pathname;
	const protectedPaths = ["/bookmark", "/createRecipe"];
	const { authenticated } = useContext(AuthContext);

	if(!authenticated && protectedPaths.find((protectedPath) => protectedPath == path)) {
		location.replace('/signIn');
	}
	else return children;
}

export default ProtectedRoutes;