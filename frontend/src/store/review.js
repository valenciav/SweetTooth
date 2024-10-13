import { create } from 'zustand';

export const useReviewStore = create((set) => ({
	reviews: [],
	setReviews: (reviews) => set({ reviews }),
	createReviews: async (newReview) => {
		if(!newReview.user || !newReview.recipe || !newReview.rating) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/reviews', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newReview)
		});
		const data = await res.json();
		set((state) => ({reviews: [...state.reviews, data.data]}));
		return { success: true, message: "Review created successfully" };
	},
	fetchReviews: async () => {
		const res = await fetch('/api/reviews');
		const data = await res.json();
		set({ reviews: data.data });
	},
	editReview: async (id, updatedReview) => {
		if(!updatedReview.name || !updatedReview.author || !updatedReview.prepMinute || !updatedReview.portion || !updatedReview.description || !updatedReview.ingredients || !updatedReview.equipments || !updatedReview.instructions) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/reviews/id', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedReview)
		});
		const data = await res.json();
		set((state) => ({reviews: [...state.reviews, data.data]}));
		return { success: true, message: "Review updated successfully" };
	},
	deleteReview: async (id) => {
		const res = await fetch('/api/reviews/'+id, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({reviews: state.reviews.filter(review => review._id !== id)}));
	}
}))