import React from 'react'
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

const NavBar = () => {
	const navigate = useNavigate();
	return (
		<nav className="h-16 bg-[var(--primary)] w-full py-3 flex justify-around items-center">
			<img src="/SweetToothLogo.png" alt="Sweet Tooth Logo" className="h-full"/>
			<SearchBar/>
			<button type="button" className="px-4 py-2 rounded-xl font-semibold bg-[var(--background)] text-[var(--secondary)]" onClick={()=>{navigate('/signIn')}}>Sign In</button>
		</nav>
	)
}

export default NavBar