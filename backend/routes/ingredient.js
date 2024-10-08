import express from "express";
import Ingredient from "../models/Ingredients.js";

const router = express.Router();
router.post('/', async (req, res) => {
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
})

router.get('/', async (req, res) => {
	try {
		const ingredients = await Ingredient.find({});
		res.status(200).json({ success: true, data: ingredients });
	} catch (error) {
		console.log("Error in get ingredient: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

router.delete('/:id', async (req, res) => {
	const {id} = req.params;
	try {
		await Ingredient.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Ingredient Deleted" });
	} catch (error) {
		console.log("Error in delete ingredient: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
})

export default router;