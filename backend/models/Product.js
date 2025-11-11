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
  },
  { timestamps: true } // adds createdAt/updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
