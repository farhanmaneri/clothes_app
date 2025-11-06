import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import {
  uploadProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadProduct);
router.get("/", getProducts);

export default router;
