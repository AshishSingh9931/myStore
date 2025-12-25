import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,

    items: [
      {
        title: String,
        price: Number,
        qty: Number,
      }
    ],

    total: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
