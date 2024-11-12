import mongoose, { Schema } from 'mongoose';

const BookmarkSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	recipe: {
		type: Schema.Types.ObjectId,
		ref: 'Recipe',
		required: true
	}
}, {
	timestamps: true
})

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

export default Bookmark;