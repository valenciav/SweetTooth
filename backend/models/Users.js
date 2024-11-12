import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt-nodejs";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: [true, "Username required"]
	},
	email: {
		type: String,
		required: true,
		unique: [true, "Email required"]
	},
	password: {
		type: String,
		required: [true, "Password required"]
	},
	profilePicture: Buffer,
	bannerPicture: Buffer,
	bio: String,
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