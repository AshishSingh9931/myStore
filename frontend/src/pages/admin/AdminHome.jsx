import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaPlus, FaListAlt, FaHome } from "react-icons/fa";

export default function AdminHome() {
  return (
    <div className="max-w-4xl mx-auto p-10">

      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 transition"
      >
        <FaHome className="text-xl" />
        <span className="font-semibold text-lg">Back to Home</span>
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl 
                     hover:-translate-y-1 transition border text-center"
        >
          <FaBoxOpen className="text-4xl text-indigo-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Manage Products</h2>
          <p className="text-gray-600 mt-2 text-sm">Edit or delete products</p>
        </Link>

        <Link
          to="/admin/add-product"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl 
                     hover:-translate-y-1 transition border text-center"
        >
          <FaPlus className="text-4xl text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
          <p className="text-gray-600 mt-2 text-sm">Add new books</p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-xl shadow hover:shadow-xl 
                     hover:-translate-y-1 transition border text-center"
        >
          <FaListAlt className="text-4xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">View Orders</h2>
          <p className="text-gray-600 mt-2 text-sm">Check all customer orders</p>
        </Link>

      </div>
    </div>
  );
}
