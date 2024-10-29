import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
	recipes: [],
	setRecipes: (recipes) => set({ recipes }),
	createRecipe: async (recipe) => {
		try {
			const res = await fetch('/api/recipes', {
				credentials: 'include',
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({recipe})
			});
			const data = await res.json();
			if(!data.success) return ({ success: false, message: data.message});
			set((state) => ({recipes: [...state.recipes, data.data]}));
			return { success: true, message: "Recipe created successfully" };
		} catch (error) {
			return ({ success: false, message: error});
		}
	},
	fetchRecipes: async () => {
		try {
			const res = await fetch('/api/recipes');
			const data = await res.json();
			set({ recipes: data.data });
		} catch (error) {
			console.log(error)
		}
	},
	fetchRecipeById: async (id) => {
		const res = await fetch(`/api/recipes/${id}`).then((response) => response.json());
		return res.data;
	},
	editRecipe: async (id, updatedRecipe) => {
		if(!updatedRecipe.title || !updatedRecipe.author || !updatedRecipe.prepMinute || !updatedRecipe.portion || !updatedRecipe.description || !updatedRecipe.ingredients || !updatedRecipe.equipments || !updatedRecipe.instructions) {
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