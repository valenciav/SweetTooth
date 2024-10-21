import { create } from 'zustand';

export const useBookmarkStore = create((set) => ({
	bookmarks: [],
	setBookmarks: (bookmarks) => set({ bookmarks }),
	createBookmark: async (newBookmark) => {
		const res = await fetch('/api/users/addBookmark', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newBookmark)
		});
		const data = await res.json();
		console.log(data);
		set((state) => ({bookmarks: [...state.bookmarks, data.data]}));
		return { success: true, message: "Bookmark created successfully" };
	},
	fetchBookmarks: async () => {
		const res = await fetch(`/api/users/getBookmarks`, {credentials: 'include'});
		const bookmarks = await res.json();
		console.log(bookmarks)
		set({ bookmarks: bookmarks.data });
	},
	deleteBookmark: async (id) => {
		const res = await fetch('/api/bookmarks/'+id, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({bookmarks: state.bookmarks.filter(bookmark => bookmark._id !== id)}));
	}
}))