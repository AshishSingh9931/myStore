import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../stores/cartContext";

export default function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [category]);

  function buyNow(product) {
    addToCart(product);
    window.location.href = "/cart";
  }

  if (loading) {
    return <div className="text-xl font-semibold">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 capitalize text-gray-800">
        {category} Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {products.map((p) => (
          <div
            key={p._id}
            className="
              bg-white rounded-2xl shadow-lg border border-gray-200 
              p-5 hover:-translate-y-2 hover:shadow-2xl transition duration-300
            "
          >
            <div className="w-full h-60 overflow-hidden rounded-xl mb-4">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              {p.title}
            </h2>

            <p className="text-gray-700 font-medium mt-2 mb-4">
              ${p.price}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => buyNow(p)}
                className="
                  w-1/2 bg-blue-600 text-white py-2 rounded-lg
                  hover:bg-blue-700 transition shadow
                "
              >
                Buy Now
              </button>

              <button
                onClick={() => addToCart(p)}
                className="
                  w-1/2 bg-green-600 text-white py-2 rounded-lg
                  hover:bg-green-700 transition shadow
                "
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
