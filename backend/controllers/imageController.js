import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const newImage = new Image({
      filename: file.originalname,
      url: file.path, // ✅ This is Cloudinary's HTTPS URL
    });
    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
