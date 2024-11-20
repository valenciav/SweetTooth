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
			httpOnly: true
		})
		res.status(200).json({success: true, message: "Successfully logged in"});
	} catch (error) {
		console.log("Error in authentication:", error);
		res.status(500).json({ success: false, message: "Failed to issue session" });
	}
}

export const signOut = async (req, res) => {
	
  res.status(200).json({ message: 'Successfully signed out' });
};