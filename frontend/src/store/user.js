import { create } from 'zustand';

export const useUserStore = create((set) => ({
	users: [],
	setUsers: (users) => set({ users }),
	createUsers: async (newUser) => {
		if(!newUser.userName || !newUser.email || !newUser.password) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/users', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newUser)
		});
		const data = await res.json();
		set((state) => ({users: [...state.users, data.data]}));
		return { success: true, message: "User created successfully" };
	},
	fetchUsers: async () => {
		const res = await fetch('/api/users');
		const data = await res.json();
		set({ users: data.data });
	},
	editUser: async (id, updatedUser) => {
		if(!updatedUser.userName || !updatedUser.email || !updatedUser.password) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/users/id', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedUser)
		});
		const data = await res.json();
		set((state) => ({users: [...state.users, data.data]}));
		return { success: true, message: "User updated successfully" };
	},
	deleteUser: async (id) => {
		const res = await fetch('/api/users/'+id, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({users: state.users.filter(user => user._id !== id)}));
	}
}))