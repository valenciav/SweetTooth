import mongoose from "mongoose";
import User from "../models/Users.js";
import Follow from "../models/Follows.js";

export const createUser = async (req, res) => {
	const user = req.body;
	if(!user.username || !user.email || !user.password || !user.confirmPassword) {
		return res.status(400).json({ success: false, message: "Incomplete credentials" });
	}
	const checkEmail = await User.findOne({email: user.email}, {username: user.username});
	if(checkEmail) {
		return res.status(409).json({ success: false, message: "Email is already registered"});
	}
	const checkUsername = await User.findOne({username: user.username});
	if(checkUsername) {
		return res.status(409).json({ success: false, message: "Username is already taken"});
	}
	const newUser = new User(user);

	try {
		const hashedPassword = newUser.hashPassword();
		newUser.set("password", hashedPassword);
		await newUser.save();
		res.status(201).json({ success: true, message: "User created"});
	} catch (error) {
		console.log("Error in create user: ", error.message);
		res.status(500).json({ success: false, message: error.message });
	}
}

export const getUserByUsername = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findOne({username}).select('-email -password').populate('recipes', 'title thumbnail');
		const followers = await Follow.find({followed_id: user._id}).populate('follower_id', '-_id username profilePicture').then(follows => follows.map(follow => follow.follower_id));
		const followings = await Follow.find({follower_id: user._id}).populate('followed_id', '-_id username profilePicture').then(follows => follows.map(follow => follow.followed_id));
		if(user) res.status(200).json({ success: true, message: "Successfully fetched user", data: {...user._doc, followers, followings}});
		else res.status(404).json({success: false, message: "User not found"});
	} catch (error) {
		console.log("Error in get user:", error);
		res.status(500).json({ success: false, message: "Failed to get user data" });
	}
}

export const editProfile = async (req, res) => {
	const {id} = req.user._id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "User not found" });
	}
	const userUpdate = req.body;
	try {
		const user = await User.findByIdAndUpdate(id, userUpdate, true);
		res.status(200).json({ success: true, message:"Successfully updated profile", data: user });
	} catch (error) {
		console.log("Error in update user: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteProfile = async (req, res) => {
	const {id} = req.user._id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "User not found" });
	}
	try {
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "User deleted" });
	} catch (error) {
		console.log("Error in delete user: ", error.message);
		res.status(500).json({ success: false, message: "Failed to delete user"});
	}
}

export const checkUsernameAvailability = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({username}).select('-password');
		res.status(200).json({ success: true, available: user == null });
	} catch (error) {
		console.log("Error in get user by username: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const checkEmailAvailability = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await User.findOne({email}).select('-password');
		res.status(200).json({ success: true, available: user == null });
	} catch (error) {
		console.log("Error in get user by email: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}