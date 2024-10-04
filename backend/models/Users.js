import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt-nodejs";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profilePicture: Buffer,
	bannerPicture: Buffer,
	bio: String,
	bookmarks: [{
		type: Schema.Types.ObjectId,
		ref: 'Recipe'
	}],
	followings: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	followers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
}, {
	timestamps: true
})

userSchema.methods.hashPassword = function() {
	return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;