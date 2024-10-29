import mongoose from "mongoose";
import User from "../models/Users.js";

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

export const getProfile = async (req, res) => {
	try {
		const user = req.user;
		res.status(200).json({ success: true, data: user});
	} catch (error) {
		console.log("Error in get profile:", error);
	}
}

export const editUser = async (req, res) => {
	const {id} = req.user._id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({ success: false, message: "User not found" });
	}
	const userUpdate = req.body;
	try {
		const user = await User.findByIdAndUpdate(id, userUpdate, true);
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.log("Error in update user: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteUser = async (req, res) => {
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

export const getBookmarks = async (req, res) => {
	try {
		const id = req.user._id;
		const user = await User.findOne({_id:id}).select('-password').populate('bookmarks');
		const bookmarks = user.bookmarks;
		res.status(200).json({ success: true, data: bookmarks });
	} catch (error) {
		console.log("Error in getting bookmarked recipes: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const addBookmark = async (req, res) => {
	try {
		const id  = req.user._id;
		const { recipeId } = req.body;
		let bookmarks = await User.findOne({_id: id}).select('bookmarks').then((response) => response.bookmarks);
		if(!bookmarks || bookmarks.indexOf(recipeId) == -1) bookmarks.push(recipeId);
		else bookmarks = bookmarks.filter((bookmark)=> {bookmark == recipeId});
		await User.findByIdAndUpdate(id, {bookmarks: bookmarks});
		const newBookmarks = await User.findOne({_id: id}).select('bookmarks').populate('bookmarks')
		res.status(200).json({ success: true, data: newBookmarks.bookmarks, message: "Bookmarked Recipe"});
	} catch (error) {
		console.log("Error in adding bookmark: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}