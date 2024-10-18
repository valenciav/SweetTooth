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
		set({ user: data.data });
	},
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}))