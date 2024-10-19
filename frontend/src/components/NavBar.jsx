import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useUserStore } from '../store/user';
import { FaBell } from 'react-icons/fa';

const NavBar = () => {
	const navigate = useNavigate();
	const { fetchUserData, user } = useUserStore();
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData])

	const toggleProfileMenu = () => {

	}

	const toggleNotification = () => {

	}

	return (
		<nav className="h-16 bg-[var(--primary)] w-full py-3 px-5 flex justify-between items-center">
			<img src="/SweetToothLogo.png" alt="Sweet Tooth Logo" className="h-full"/>
			<SearchBar/>
			{user ?
				<div className='flex gap-3'>
					<button className='text-[var(--background)]' onClick={toggleNotification}><FaBell size={24}/></button>
					<button className='bg-black rounded-full' onClick={toggleProfileMenu}><img src={'/SweetToothIcon_Resized.png'} alt='Profile Picture' className='h-10 rounded-full'/></button>
				</div>
				:
				<button type="button" className="px-4 py-2 rounded-xl font-semibold bg-[var(--background)] text-[var(--secondary)]" onClick={()=>{navigate('/signIn')}}>Sign In</button>
			}
		</nav>
	)
}

export default NavBar