import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	fetchUserData: async () => {
		const res = await fetch('/api/users/getUserData', {
			method: 'GET',
			credentials: 'include'
		});
		const data = await res.json();
		console.log(data)
		set({ user: data.token });
	},
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}))