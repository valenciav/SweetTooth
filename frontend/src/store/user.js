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
	login: (user) => set({ user, isAuthenticated: true }),
	logout: () => set({ user: null, isAuthenticated: false })
}))