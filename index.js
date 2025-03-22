import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";
import registerRoutes from "./routes/register_routes.js";
import loginRoutes from "./routes/login_routes.js";
import cors from "cors";

dotenv.config();

connectDB();
const PORT = process.env.PORT || 7000;

const app = express();
app.use(express.json());

app.use(cors({
  origin : "*",
}))

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
