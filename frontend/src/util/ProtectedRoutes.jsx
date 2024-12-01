import React from 'react'
import useAuth from './useAuth';

const ProtectedRoutes = ({ children }) => {
	let path = location.pathname;
	const authenticationPaths = ["/signIn", "/register"];
	const protectedPaths = ["/bookmark", "/createRecipe"];
	const { authenticated, loading } = useAuth();

	if(loading) {
		return (
			<div className='flex flex-col justify-center items-center'>
				<h4>Hang on, we&apos;re processing your request :)</h4>
			</div>
		)
	}

	if(protectedPaths.find((protectedPath) => protectedPath == path && !authenticated)) {
		location.replace('/signIn');
	}
	else if(authenticationPaths.find((authenticationPath) => authenticationPath == path && authenticated)) {
		location.replace('/');
	}
	else return children;
}

export default ProtectedRoutes;