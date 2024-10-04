import mongoose, { Schema } from "mongoose";

const recipeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	prepMinute: {
		type: Number,
		required: true
	},
	portion: {
		type: Number,
		required: true
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	description: {
		type: String,
		required: true
	},
	ingredients: [{
		ingredient: {
			type: Schema.Types.ObjectId,
			ref: 'Ingredient'
		},
		quantity: Number,
		unit: String
	}],
	equipments: [{
		type: Schema.Types.ObjectId,
		ref: 'Equipment'
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