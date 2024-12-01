import mongoose, { Schema } from "mongoose";

const FollowSchema = new Schema({
	follower_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	followed_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
}, {
	timestamps: true
})

const Follow = mongoose.model('follow', FollowSchema);

export default Follow;