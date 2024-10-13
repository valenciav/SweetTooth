import { create } from 'zustand';

export const useIngredientStore = create((set) => ({
	ingredients: [],
	setIngredients: (ingredients) => set({ ingredients }),
	fetchIngredients: async () => {
		const res = await fetch('/api/ingredients');
		const data = await res.json();
		set({ ingredients: data.data });
	}
}))