import mongoose from "mongoose";
import Recipe from "../models/Recipes.js";
import Bookmark from "../models/Bookmarks.js";
import Review from "../models/Reviews.js";
import { getFile, uploadFile } from "../util/lib.js";

export const createRecipe = async (req, res) => {
	const formData = req.body
	let recipe = {};
	for(let prop in formData) {
		recipe = {...recipe, [prop]: JSON.parse(formData[prop])};
	}
	console.log(recipe)
	const user = req.user;
	if(!recipe.title || !recipe.prepMinute || !recipe.portion || recipe.ingredients.length == 0 || !recipe.ingredients[0].quantity || !recipe.equipments || !recipe.instructions) {
			return res.status(400).json({ success: false, message: "Incomplete information"});
	}
	try {
		const thumbnail = await uploadFile(req.file);
		const newRecipe = Recipe({...recipe, 'author':user, 'thumbnail': thumbnail});
		await newRecipe.save();
		res.status(201).json({ success: true, data: newRecipe });
	} catch (error) {
		console.log("Error in create recipe: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getRecipes = async (req, res) => {
	try {
		const recipes = await Recipe.find({}).populate('author', 'username');
		for(const recipe of recipes) {
			const url = recipe.thumbnail ? await getFile(recipe.thumbnail) : '';
			recipe.thumbnail = url;
		}
		res.status(200).json({ success: true, data: recipes });
	} catch (error) {
		console.log("Error in get recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getRecipeById = async (req, res) => {
	const { id } = req.params;
	try {
		const recipe = await Recipe.findById(id).populate('author', 'username');
		recipe.thumbnail = recipe.thumbnail ? await getFile(recipe.thumbnail) : '';
		const bookmarks = await Bookmark.find({recipe: id});
		const reviews = await Review.find({recipe:id});
		res.status(200).json({ success: true, data: {...recipe._doc, bookmarkCount: bookmarks.length, reviews} });
	} catch (error) {
		console.log("Error in get recipe information:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const editRecipe = async (req, res) => {
	const { id } = req.params;
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
	const { id } = req.params;
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