import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: null,
	fetchUserData: async () => { 
		try {
			const res = await fetch('/api/users/getProfile', {
				credentials: 'include'
			}).then((response) => response.json());
			if(res.success) set({ user: res.data });
			return { success: true };
		} catch (error) {
			console.log(error);
			return { success: false, message: "Failed to fetch user data"};
		}
	},
	login: async (user) => {
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
			if(res.success) set({ user });
			return { success: res.success, message: res.message };
		} catch (error) {
			console.log(error);
			return { success: false, message: 'Failed to log in' };
		}
	},
	logout: async () => {		
		const res = await fetch('http://localhost:5000/signOut', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			}
		})
		const result = await res.json();
		if(result.success) {
			return { success: true, message: "Successfully logged out" };
		}
		set({ user: null })}
}))