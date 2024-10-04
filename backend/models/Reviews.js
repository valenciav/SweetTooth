import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	recipe: {
		type: Schema.Types.ObjectId,
		ref: 'Recipe',
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	comment: String
}, {
	timestamps: true
})

const Review = mongoose.model('Review', reviewSchema);

export default Review;