import React, { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        alert("Product Added!");
        window.location.href = "/admin/products";
      });
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Product Title
          </label>
          <input
            name="title"
            placeholder="Enter product name..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Price ($)
          </label>
          <input
            name="price"
            type="number"
            placeholder="Enter price..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <input
            name="category"
            placeholder="Example: programming, novels..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Image URL
          </label>
          <input
            name="image"
            placeholder="Paste product image URL..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}
