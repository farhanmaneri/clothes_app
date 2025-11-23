import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware


const allowedOrigins = [
  "http://localhost:5173", // local dev frontend
  "https://clothes-app-mocha.vercel.app", // deployed frontend
 "https://clothes-app-wk3v.vercel.app"
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // if you need cookies/auth headers
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/products", productRoutes);

// Optional routes
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/api", (req, res) => res.send("Backend is running"));
app.get("/", (req, res) => res.send("API is running. Use /products, etc."));

// Connect DB
connectDB();

// ✅ Export for Vercel
export default app;

// ✅ Local dev only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
