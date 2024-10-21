import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	fetchUserData: async () => {
		const res = await fetch('http://localhost:5000/', {
			method: 'POST',
			credentials: 'include'
		})
		const data = await res.json();
		set({ user: data.user });
	},
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}))