import express from "express";
import { createRecipe, deleteRecipe, editRecipe, getRecipes } from "../controller/recipe-controller.js";

const router = express.Router();

router.post('/', createRecipe);
router.get('/', getRecipes);
router.put('/:id', editRecipe);
router.delete('/:id', deleteRecipe);

export default router;