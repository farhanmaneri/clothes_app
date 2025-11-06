import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();
 

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images
app.use("/api/images", imageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
