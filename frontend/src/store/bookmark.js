import { create } from 'zustand';

export const useBookmarkStore = create((set) => ({
	bookmarks: [],
	setBookmarks: (bookmarks) => set({ bookmarks }),
	createBookmark: async (recipeId) => {
		const res = await fetch('/api/users/addBookmark', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({recipeId})
		});
		const data = await res.json();
		set({bookmarks: data.data});
		return { success: true, message: "Bookmark created successfully" };
	},
	fetchBookmarks: async () => {
		const res = await fetch(`/api/users/getBookmarks`, {credentials: 'include'}).then((response) => response.json());
		const bookmarks = res.data;
		set({ bookmarks });
		return bookmarks;
	}
}))