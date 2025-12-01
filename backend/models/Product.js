import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    status: {
      type: String,
      enum: ["available", "out"],
      default: "available",
    },
    category: {
      type: String,
      enum: ["gent", "ladies"], // ✅ restricts to gent or ladies
      required: true, // ✅ must always have a category
    },
  },
  { timestamps: true } // adds createdAt/updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
