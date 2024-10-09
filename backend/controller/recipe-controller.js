import mongoose from "mongoose";
import Recipe from "../models/Recipes.js";

export const createRecipe = async (req, res) => {
	const recipe = req.body;
	if(!recipe.name || !recipe.author || !recipe.prepMinute || !recipe.portion || !recipe.description || !recipe.ingredients || !recipe.equipments || !recipe.instructions) {
		return res.status(400).json({ success: false, message: "Please provide all required information" });
	}

	const newRecipe = new Recipe(recipe);

	try {
		await newRecipe.save();
		res.status(201).json({ success: true, data: newRecipe });
	} catch (error) {
		console.log("Error in create recipe: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({});
		res.status(200).json({ success: true, data: recipes });
	} catch (error) {
		console.log("Error in get recipe: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const editRecipe = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Recipe not found" });
	}
	const recipeUpdate = req.body;
	try {
		const recipe = await Recipe.findByIdAndUpdate(id, recipeUpdate, {new: true});
		res.status(200).json({ success: true, data: recipe });
	} catch (error) {
		console.log("Error in update recipe: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteRecipe = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Recipe not found" });
	}
	try {
		await Recipe.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Recipe Deleted" });
	} catch (error) {
		console.log("Error in delete recipe: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}