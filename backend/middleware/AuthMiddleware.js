import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";

dotenv.config();

export  const userVerification = (req, res, next) => {
	const token = req.cookies.token;
	if(!token) {
		res.status(401).json({ success: false });
		throw new Error('Unauthorized');
	}
	jwt.verify(token, process.env.TOKEN_KEY, async(err, data) => {
		if(err) {
			res.json({ success: false });
			throw new Error('Unauthorized');
		}
		else {
			const user = await User.findById(data.id).select('-password');
			if(user) {
				req.user = user;
				next()
			}
			else {
				res.json({ status: false });
				throw new Error('Unauthorized');
			}
		}
	})
}