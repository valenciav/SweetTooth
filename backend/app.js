import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes)

app.get('/', (req, res) => {
	res.send("Home page");
})

app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:5000");
})