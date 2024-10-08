import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.js";
import equipmentRoutes from "./routes/equipment.js";
import ingredientRoutes from "./routes/ingredient.js";
import notificationRoutes from "./routes/notification.js";
import recipeRoutes from "./routes/recipe.js";
import reviewRoutes from "./routes/review.js";
import tagRoutes from "./routes/tag.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/tags", tagRoutes);

app.get('/', (req, res) => {
	res.send("Home page");
})

app.listen(5000, () => {
	connectDB();
	console.log("Server started at http://localhost:5000");
})