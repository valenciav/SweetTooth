import express from "express";
import { createReview, deleteReview, editReview, getReviews } from "../controller/review-controller.js";
import { userVerification } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', userVerification, createReview);
router.get('/', getReviews);
router.put('/:id', userVerification, editReview);
router.delete('/:id', userVerification, deleteReview);

export default router;