import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);

// Default route for testing
app.get("/api", (req, res) => {
  res.send("Backend is running");
});
app.get("/favicon.ico", (req, res) => res.status(204).end());
// Connect DB
connectDB();

// ✅ Export app for Vercel
export default app;

// ✅ Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
}
