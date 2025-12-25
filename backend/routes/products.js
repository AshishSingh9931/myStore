import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET all products OR by category
router.get("/", async (req, res) => {
  const category = req.query.category;
  const products = await Product.find(category ? { category } : {});
  res.json(products);
});

// GET single product
router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  res.json(p);
});

// CREATE product (no login protection)
router.post("/", async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
