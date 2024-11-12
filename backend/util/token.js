import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createSecretToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: "7d"
	});
};

export const acceptSingleFile = (name) => {
	upload.single(name);
}