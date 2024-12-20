import mongoose from "mongoose";
import Review from "../models/Reviews.js";

export const createReview = async (req, res) => {
	const review = req.body;
	if(!review.user || !review.recipe || !review.rating) {
		return res.status(400).json({ success: false, message: "Please provide the name" });
	}

	const newReview = new Review(review);

	try {
		await newReview.save();
		res.status(201).json({ success: true, data: newReview });
	} catch (error) {
		console.log("Error in create review: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getReviews = async (req, res) => {
	try {
		const reviews = await Review.find({});
		res.status(200).json({ success: true, data: reviews });
	} catch (error) {
		console.log("Error in get review: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const editReview = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Review not found" });
	}
	const reviewUpdate = req.body;
	try {
		const review = await Review.findByIdAndUpdate(id, reviewUpdate, {new: true});
		res.status(200).json({ success: true, data: review });
	} catch (error) {
		console.log("Error in update review: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteReview = async (req, res) => {
	const {id} = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "Review not found" });
	}
	try {
		await Review.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Review Deleted" });
	} catch (error) {
		console.log("Error in delete review: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}