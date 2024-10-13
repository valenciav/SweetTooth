import { create } from 'zustand';

export const useTagStore = create((set) => ({
	tags: [],
	setTags: (tags) => set({ tags }),
	fetchTags: async () => {
		const res = await fetch('/api/tags');
		const data = await res.json();
		set({ tags: data.data });
	}
}))