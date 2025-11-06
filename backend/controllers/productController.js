import Product from "../models/Product.js";

export const uploadProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const file = req.file;

    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl: file.path, // Cloudinary URL
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
