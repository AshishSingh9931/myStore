import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// save order(frontend)

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all orders(admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
