import express from "express";
import upload from "../middleware/cloudinaryUpload.js";
import { uploadImage, getImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);

export default router;
