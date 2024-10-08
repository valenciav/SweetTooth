import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	recipes: [{
		type: Schema.Types.ObjectId,
		ref: 'Recipe'
	}]
})

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;