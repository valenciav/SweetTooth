import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";

dotenv.config();

export  const userVerification = (req, res, next) => {
	const token = req.cookies.token;
	if(!token) {
		return next({status: 401, message:"User not signed in"});
		// throw new Error('Unauthorized');
	}
	jwt.verify(token, process.env.TOKEN_KEY, async(err, data) => {
		if(err) {
			return next({status: 401, message:"Unauthorized"});
			// throw new Error('Unauthorized');
		}
		else {
			const user = await User.findById(data.id).select('-email -password');
			if(user) {
				req.user = user;
				next()
			}
			else {
				return next({status: 401, message: "Please sign in"});
				// throw new Error('Unauthorized');
			}
		}
	})
}