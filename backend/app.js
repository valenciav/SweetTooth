import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import recipeRoutes from "./routes/recipe.js";
import reviewRoutes from "./routes/review.js";
import authenticationRoutes from "./routes/authentication.js";
import ErrorHandler from "./middleware/ErrorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true
	})
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/", authenticationRoutes);

app.get('/', (req, res, next) => {
	try {
		res.send('Home page');
	} catch (error) {
		next(error);
	}
})

app.use(ErrorHandler)

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
})