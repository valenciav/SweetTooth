import { create } from 'zustand';

export const useBookmarkStore = create((set) => ({
	bookmarks: [],
	setBookmarks: (bookmarks) => set({ bookmarks }),
	createBookmark: async (recipeId) => {
		try {
			const res = await fetch('/api/bookmarks/', {
				credentials: "include",
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({recipeId})
			}).then((response) => response.json()).then((response) => response.data);
			set((state) => ({bookmarks: [...state.bookmarks, res]}));
			return { success: true, message: "Bookmark created successfully" };
		} catch (error) {
			console.log(error);
			return { success: false, message: "Failed to add bookmark"};
		}
	},
	fetchBookmarks: async () => {
		try {
			const res = await fetch(`/api/bookmarks/`, {credentials: 'include'}).then((response) => response.json()).then((response) => response.data);
			set({ bookmarks: res });
			return { success: true, message: "Successfully fetched bookmarks" };
		} catch (error) {
			console.log(error);
			return { success: false, message: "Failed to get bookmarks"};
		}
	},
	deleteBookmark: async (recipeId) => {
		try {
			const res = await fetch(`/api/bookmarks/`, {
				credentials: "include",
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({recipeId})
			}).then((response) => response.json());
			set((state) => ({bookmarks: state.bookmarks.filter((bookmark) => bookmark.recipe._id !== recipeId)}));
			return { success: true, message: "Bookmark removed successfully"};
		} catch (error) {
			console.log(error);
			return { success: false, message: "Failed to remove bookmark"};
		}
	}
}))