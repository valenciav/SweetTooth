import mongoose, { Schema } from "mongoose";

const ingredientSchema = new Schema({
	name: {
		type: String,
		required: true
	}
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;