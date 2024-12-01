import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaBell } from 'react-icons/fa';
import { FaUserLarge } from "react-icons/fa6";
import { IoBookmark, IoLogOut } from 'react-icons/io5';
import useAuth from '../util/useAuth';

const NavBar = () => {
	const navigate = useNavigate();
	const [ profileMenuVis, setProfileMenuVis ] = useState(false)
	const [ notificationVis, setNotificationVis ] = useState(false)
	const { authenticated, logOut } = useAuth();

	const toggleProfileMenu = () => {
		if(notificationVis) setNotificationVis(profileMenuVis);
		setProfileMenuVis(!profileMenuVis);
	}

	const toggleNotification = () => {
		if(profileMenuVis) setProfileMenuVis(notificationVis);
		setNotificationVis(!notificationVis);
	}

	const collapseDropdown = () => {
		if(profileMenuVis) setProfileMenuVis(false);
		if(notificationVis) setNotificationVis(false);
	}

	return (
		<nav className="h-16 bg-primary w-full py-3 px-5 flex justify-between items-center">
			<div className={`absolute w-full h-full top-0 left-0 ${notificationVis || profileMenuVis ? 'block' : 'hidden'}`} onClick={collapseDropdown}></div>
			<img src="/SweetToothLogo.png" alt="Sweet Tooth Logo" className="h-full"/>
			<SearchBar/>
			{authenticated ?
				<div className='flex gap-3'>
					<div className='flex flex-col justify-center items-start'>
						<button className= 'text-background z-10' onClick={toggleNotification}><FaBell size={24}/></button>
						<ul className= {`${notificationVis ? 'visible' : 'hidden'} dropdown w-96 top-16 -translate-x-full`}>
							<li>Welcome to SweetTooth! Here&apos;s a cookie 🍪</li>
						</ul>
					</div>
					<div className='flex flex-col'>
						<button className='bg-secondary rounded-full z-10' onClick={toggleProfileMenu}><img src={'/SweetToothIcon.png'} alt='Profile Picture' className='h-10 rounded-full'/></button>
						<ul className={`${profileMenuVis ? 'visible' : 'hidden'} dropdown top-16 -translate-x-3/4`}>
							<li><Link to='/' className='flex items-center gap-2'><FaUserLarge />Profile</Link></li>
							<hr></hr>
							<li><Link to='/bookmark' className='flex items-center gap-2 cursor-pointer'><IoBookmark />Bookmarks</Link></li>
							<hr></hr>
							<li><Link to='' onClick={logOut} className='flex items-center gap-2'><IoLogOut />Sign Out</Link></li>
						</ul>
					</div>
				</div>
				:
				<button type="button" className="px-4 py-2 rounded-xl font-semibold bg-background text-secondary" onClick={() => navigate('/signIn')}>Sign In</button>
			}
		</nav>
	)
}

export default NavBar