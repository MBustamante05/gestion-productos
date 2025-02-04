import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);