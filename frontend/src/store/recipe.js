import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
	recipes: [],
	currentRecipe: {
		author: {
			username: ''
		},
		title: '',
		thumbnail: null,
		prepHour: null,
		prepMin: null,
		portion: null,
		tags: [],
		description: '',
		ingredients: [
			{
				quantity: null,
				unit: '',
				item: ''
			}
		],
		equipments: ['Bowl'],
		instructions: [''],
		tips: '',
		bookmarkCount: 0,
		reviews: []
	},
	setRecipes: (recipes) => set({ recipes }),
	setCurrRecipe: (currentRecipe) => set({ currentRecipe }),
	createRecipe: async (recipe) => {
		try {
			const res = await fetch('/api/recipes', {
				credentials: 'include',
				method: "POST",
				body: recipe
			});
			const data = await res.json();
			if(!data.success) return ({ success: false, message: data.message});
			set((state) => ({recipes: [...state.recipes, data.data]}));
			return { success: true, message: "Recipe created successfully" };
		} catch (error) {
			console.log(error)
			return { success: false, message: error};
		}
	},
	fetchRecipes: async () => {
		try {
			const res = await fetch('/api/recipes');
			const data = await res.json();
			set({ recipes: data.data });
		} catch (error) {
			console.log(error)
			return { success: false, message: error};
		}
	},
	fetchRecipeById: async (id) => {
		try {
			const res = await fetch(`/api/recipes/${id}`).then((response) => response.json());
			if(res.success) set({currentRecipe: res.data});
		} catch (error) {
			console.log(error)
			return { success: false, message: error};
		}
	},
	editRecipe: async (id, updatedRecipe) => {
		if(!updatedRecipe.title || !updatedRecipe.author || !updatedRecipe.prepMinute || !updatedRecipe.portion || !updatedRecipe.description || !updatedRecipe.ingredients || !updatedRecipe.equipments || !updatedRecipe.instructions) {
			return { success: false, message: "Please fill in the required fields" };
		}
		const res = await fetch(`/api/recipes/${id}`, {
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
		const res = await fetch(`/api/recipes/${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if(!data.success) return { success: false, message: data.message }
		
		set((state) => ({recipes: state.recipes.filter(recipe => recipe._id !== id)}));
	},
	// fetchRecipeBookmarkCount: async (id) => {
	// 	try {
	// 		const res = await fetch(`/api/recipes/getBookmarkCount/${id}`).then((response) => response.json());
	// 		return res.success ? res.data : 0;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return 0;
	// 	}
	// }
}))