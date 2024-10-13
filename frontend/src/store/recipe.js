import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
	recipes: [],
	setRecipes: (recipes) => set({ recipes }),
	createRecipes: async (newRecipe) => {
		if(!newRecipe.name || !newRecipe.author || !newRecipe.prepMinute || !newRecipe.portion || !newRecipe.description || !newRecipe.ingredients || !newRecipe.equipments || !newRecipe.instructions) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/recipes', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newRecipe)
		});
		const data = await res.json();
		set((state) => ({recipes: [...state.recipes, data.data]}));
		return { success: true, message: "Recipe created successfully" };
	},
	fetchRecipes: async () => {
		const res = await fetch('/api/recipes');
		const data = await res.json();
		set({ recipes: data.data });
	},
	editRecipe: async (id, updatedRecipe) => {
		if(!updatedRecipe.name || !updatedRecipe.author || !updatedRecipe.prepMinute || !updatedRecipe.portion || !updatedRecipe.description || !updatedRecipe.ingredients || !updatedRecipe.equipments || !updatedRecipe.instructions) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch('/api/recipes/id', {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedRecipe)
		});
		const data = await res.json();
		set((state) => ({recipes: [...state.recipes, data.data]}));
		return { success: true, message: "Recipe updated successfully" };
	},
	deleteRecipe: async (id) => {
		const res = await fetch('/api/recipes/'+id, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({recipes: state.recipes.filter(recipe => recipe._id !== id)}));
	}
}))