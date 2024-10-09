import express from "express";
import { createIngredient, deleteIngredient, getIngredients } from "../controller/ingredient-controller.js";

const router = express.Router();

router.post('/', createIngredient);
router.get('/', getIngredients);
router.delete('/:id', deleteIngredient);

export default router;