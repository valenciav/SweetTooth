import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
	name: String,
	recipes: [{
		type: Schema.Types.ObjectId,
		ref: 'Recipe'
	}]
})

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;