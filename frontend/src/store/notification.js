import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
	notifications: [],
	setNotifications: (notifications) => set({ notifications }),
	createNotifications: async (newNotification) => {
		if(!newNotification.name || !newNotification.user || !newNotification.message) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/notifications', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newNotification)
		});
		const data = await res.json();
		set((state) => ({notifications: [...state.notifications, data.data]}));
		return { success: true, message: "Notification created successfully" };
	},
	fetchNotifications: async () => {
		const res = await fetch('/api/notifications');
		const data = await res.json();
		set({ notifications: data.data });
	},
	deleteNotification: async (id) => {
		const res = await fetch('/api/notifications/'+id, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({notifications: state.notifications.filter(notification => notification._id !== id)}));
	}
}))