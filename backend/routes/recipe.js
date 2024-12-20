import express from "express";
import { createRecipe, deleteRecipe, editRecipe, getRecipeById, getRecipes } from "../controller/recipe-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";
import { acceptSingleFile } from "../util/lib.js";

const router = express.Router();

router.post('/', acceptSingleFile('thumbnail'), userVerification, createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', userVerification, editRecipe);
router.delete('/:id', userVerification, deleteRecipe);

export default router;