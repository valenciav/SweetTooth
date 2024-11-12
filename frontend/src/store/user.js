import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	fetchUserData: async () => {
		try {
			const res = await fetch('api/users/getProfile', {
				credentials: 'include'
			}).then((response) => response.json());
			set({ user: res.data });
		} catch (error) {
			console.log(error)
		}
	},
	login: async (user) => {
		if(!user.email || !user.password) return;
		const res = await fetch('http://localhost:5000/signIn', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(user)
		}).then((response) => response.json());
		if(!res.success) {
			console.log('Failed to log in');
			return {success: false, message: 'Failed to log in'};
		}
		console.log('Successfully logged in');

		set({ user, isAuthenticated: true })
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
		else console.log('Failed to log out');
		set({ user: null, isAuthenticated: false })}
}))