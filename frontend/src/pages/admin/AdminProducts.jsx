import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        setProducts(products.filter(p => p._id !== id));
      });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <Link to="/admin/add-product">
        <button className="mb-6 bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </Link>

      <div className="space-y-6">
        {products.map(p => (
          <div key={p._id}
            className="p-4 border rounded-lg flex justify-between items-center">
            
            <div>
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p>${p.price}</p>
              <p className="text-gray-500">{p.category}</p>
            </div>

            <div className="flex gap-4">
              <Link to={`/admin/edit/${p._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
