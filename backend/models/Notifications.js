import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({
	user:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	message: {
		type: String,
		required: true
	},
	read: {
		type: Boolean,
		default: false
	},
	link: String
}, {
	timestamps: true
})

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;