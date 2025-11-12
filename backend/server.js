import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);

// Optional: avoid favicon 404
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Optional: test route
app.get("/api", (req, res) => {
  res.send("Backend is running");
});
// Catch-all route for root
app.get("/", (req, res) => {
  res.send("API is running. Use /api/products, etc.");
});

// Avoid favicon 404

connectDB();

// ✅ Export for Vercel
export default app;

// ✅ Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}
