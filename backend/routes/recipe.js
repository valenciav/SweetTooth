import express from "express";
import { createRecipe, deleteRecipe, editRecipe, getRecipeById, getRecipes } from "../controller/recipe-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification, createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', userVerification, editRecipe);
router.delete('/:id', userVerification, deleteRecipe);

export default router;