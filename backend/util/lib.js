import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import multer from "multer";
import crypto, { sign } from "crypto";
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

dotenv.config();

const randomImageName = () => crypto.randomBytes(32).toString('hex');

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey
	},
	region: bucketRegion
})

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const createSecretToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: "7d"
	});
};

export const acceptSingleFile = (name) => upload.single(name);

export const uploadFile = async (file) => {
	const params = {
		Bucket: bucketName,
		Key: randomImageName(),
		Body: file.buffer,
		ContentType: file.mimetype
	}
	const command = new PutObjectCommand(params);
	await s3.send(command);
	return params.Key;
}

export const getFile = async (filename) => {
	const params = {
		Bucket: bucketName,
		Key: filename,
	}
	const command = new GetObjectCommand(params);
	try {
		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
		return signedUrl;
	} catch (error) {
		console.log(error)
		return "";
	}
}