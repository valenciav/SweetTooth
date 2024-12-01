import User from "../models/Users.js";
import { createSecretToken } from "../util/token.js";

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	if(!email || !password) {
		return res.status(400).json({ success: false, message: "Incomplete credentials" });
	}
	const user = await User.findOne({email});
	if(!user) {
		return res.status(401).json({ success: false, message: "Invalid email or password"});
	}
	if(!user.validatePassword(password)) {
		return res.status(401).json({ success: false, message: "Invalid email or password"});
	}
	try {
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: true,
			maxAge : 2 * 60 * 60 * 1000
		})
		res.status(200).json({success: true, message: "Successfully logged in", data: user.username});
	} catch (error) {
		console.log("Error in authentication:", error);
		res.status(500).json({ success: false, message: "Failed to issue session" });
	}
}

export const signOut = async (req, res) => {
	try {
		res.clearCookie("token");
		res.status(200).json({ success: true, message: 'Successfully signed out' });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Failed to sign out'});
	}
};

export const getAuthenticatedUser = async (req, res) => {
	try {
		const user = req.user;
		if(user) res.status(200).json({ success: true, message: "Successfully fetched authenticated user", data: user});
	} catch (error) {
		console.log(error)
		res.status(401).json({ success: false, message: "Not signed in"});
	}
}