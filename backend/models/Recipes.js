import mongoose, { Schema } from "mongoose";

const recipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	thumbnail: Buffer,
	prepMinute: {
		type: Number,
		required: true
	},
	portion: {
		type: Number,
		required: true
	},
	tags: [{
		type: String
	}],
	description: String,
	ingredients: [{
		ingredient: String,
		quantity: Number,
		unit: String
	}],
	equipments: [{
		type: String
	}],
	instructions: [{
		type: String
	}],
	tips: String,
	reviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}]
}, {
	timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;