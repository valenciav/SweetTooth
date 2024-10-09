import mongoose from "mongoose";
import Ingredient from "../models/Ingredients.js";

export const createIngredient = async (req, res) => {
	const ingredient = req.body;
	if(!ingredient.name) {
		return res.status(400).json({ success: false, message: "Please provide the name" });
	}

	const newIngredient = new Ingredient(ingredient);

	try {
		await newIngredient.save();
		res.status(201).json({ success: true, data: newIngredient });
	} catch (error) {
		console.log("Error in create ingredient: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredient.find({});
		res.status(200).json({ success: true, data: ingredients });
	} catch (error) {
		console.log("Error in get ingredient: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteIngredient = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Ingredient not found" });
	}
	try {
		await Ingredient.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Ingredient Deleted" });
	} catch (error) {
		console.log("Error in delete ingredient: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}