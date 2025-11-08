import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import {
  uploadProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);     // Edit/update product
router.delete("/:id", deleteProduct);  // Delete product
export default router;
