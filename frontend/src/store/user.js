import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	fetchUserData: async () => {
		const res = await fetch('http://localhost:5000/api/users/getProfile', {
			credentials: 'include'
		}).then((response) => response.json());
		set({ user: res.data });
	},
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}))