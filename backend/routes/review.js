import express from "express";
import { createReview, deleteReview, editReview, getReviews } from "../controller/review-controller.js";

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.put('/:id', editReview);
router.delete('/:id', deleteReview);

export default router;