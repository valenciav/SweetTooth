import mongoose from "mongoose";
import User from "../models/Users.js";

export const getUserByUsername = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({username});
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.log("Error in get user by username: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getUserByEmail = async (req, res) => {
	const { email } = req.params;
	try {
		const user = await User.findOne({email});
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.log("Error in get user by email: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const getUserData = async (req, res) => {
	const token = req.cookies?.token;
	return res.status(200).json({ success: true, token: token });
}

export const createUser = async (req, res) => {
	console.log(req.body)
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

export const editUser = async (req, res) => {
	const {id} = req.params;
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
	const {id} = req.params;
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