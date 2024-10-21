import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
// import  { useCookies } from "react-cookie";
import SearchBar from "./SearchBar"
import { useUserStore } from '../store/user';
import { FaBell } from 'react-icons/fa';
import { FaUserLarge } from "react-icons/fa6";
import { IoBookmark, IoLogOut } from 'react-icons/io5';

const NavBar = () => {
	const navigate = useNavigate();
	// const [cookies, removeCookie] = useCookies([]);
	const { fetchUserData, user, logout } = useUserStore();
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData])

	const toggleProfileMenu = () => {

	}

	const toggleNotification = () => {

	}

	const signOut = async () => {
		const res = await fetch('http://localhost:5000/signOut', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			}
		})
		const result = await res.json();
		if(result.success) {
			console.log('Successfully logged out');
			logout()
		}
		else console.log('Failed to log out');
	}

	return (
		<nav className="h-16 bg-primary w-full py-3 px-5 flex justify-between items-center">
			<img src="/SweetToothLogo.png" alt="Sweet Tooth Logo" className="h-full"/>
			<SearchBar/>
			{user ?
				<div className='flex gap-3'>
					<button className='text-background' onClick={toggleNotification}><FaBell size={24}/></button>
					<div className='flex flex-col'>
						<button className='bg-black rounded-full' onClick={toggleProfileMenu}><img src={'/SweetToothIcon_Resized.png'} alt='Profile Picture' className='h-10 rounded-full'/></button>
						<ul className='absolute top-20 right-3 text-background bg-primary bg-opacity-60 rounded-lg overflow-clip p-3'>
							<li><a href='/' className='flex items-center gap-2'><FaUserLarge />Profile</a></li>
							<hr></hr>
							<li><a href='/bookmark' className='flex items-center gap-2'><IoBookmark />Bookmarks</a></li>
							<hr></hr>
							<li><a href='' onClick={signOut} className='flex items-center gap-2'><IoLogOut />Sign Out</a></li>
						</ul>
					</div>
				</div>
				:
				<button type="button" className="px-4 py-2 rounded-xl font-semibold bg-background text-secondary" onClick={()=>{navigate('/signIn')}}>Sign In</button>
			}
		</nav>
	)
}

export default NavBar