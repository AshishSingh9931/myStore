import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
    description: { type: String },
    countInStock: { type: Number, default: 10 }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
