import mongoose from "mongoose";
import User from "../models/Users.js";

export const getUser = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.log("Error in get user: ", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const createUser = async (req, res) => {
	const user = req.body;
	if(!user.username || !user.email || !user.password) {
		return res.status(400).json({ success: false, message: "Please fill all fields" });
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