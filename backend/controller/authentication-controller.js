import User from "../models/Users.js";

export const signUp = async (req, res) => {
	const {username, email, password} = req.body;
	const checkEmail = await User.findOne({email})
	if(checkEmail) {
		return ({ success: false, message: "Email is already registered"});
	}
	const checkUsername = await User.findOne({username})
	if(checkUsername) {
		return ({ success: false, message: "Username is already taken"});
	}
	
}