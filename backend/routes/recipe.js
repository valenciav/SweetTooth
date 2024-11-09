import express from "express";
import { createRecipe, deleteRecipe, editRecipe, getRecipeById, getRecipes } from "../controller/recipe-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/', upload.single('thumbnail'), userVerification, createRecipe);
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.put('/:id', userVerification, editRecipe);
router.delete('/:id', userVerification, deleteRecipe);

export default router;