import React, { useState } from "react";
import { useCart } from "../stores/cartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Add items to your cart and they will appear here.</p>
      </div>
    );
  }

  async function checkout() {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      userName: user.fullName,
      userEmail: user.email,
      items: cart.map((item) => ({
        title: item.title,
        price: item.price,
        qty: item.qty,
      })),
      total: total,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Order failed");
        setLoading(false);
        return;
      }

      navigate("/order-summary", {
        state: {
          orderId: data._id,
          name: orderData.userName,
          email: orderData.userEmail,
          date: new Date().toLocaleString(),
          items: orderData.items,
          total: orderData.total,
        },
      });

      clearCart();
      setLoading(false);

    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      <div className="lg:col-span-2 space-y-6">

        {cart.map((item) => (
          <div
            key={item.id || item._id}
            className="
              flex gap-5 bg-white p-5 rounded-2xl shadow-md border border-gray-200
              hover:shadow-xl transition
            "
          >
            <div className="w-32 h-32 rounded-xl overflow-hidden shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.id || item._id, Number(e.target.value))
                  }
                  className="
                    w-20 border border-gray-300 rounded-lg p-2
                    focus:ring-2 focus:ring-blue-500 focus:outline-none
                  "
                />

                <button
                  onClick={() => removeFromCart(item.id || item._id)}
                  className="
                    px-4 py-2 bg-red-600 text-white rounded-lg
                    hover:bg-red-700 transition shadow
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 h-fit sticky top-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>

        <div className="flex justify-between mb-3 text-lg">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-3 text-lg">
          <span className="text-gray-700">Shipping:</span>
          <span className="font-semibold text-gray-900">$0.00</span>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-4 text-center">
            {error}
          </div>
        )}

        <button
          onClick={checkout}
          disabled={loading}
          className="
            w-full mt-6 bg-blue-600 text-white py-3 rounded-xl 
            hover:bg-blue-700 transition shadow-lg text-lg
          "
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
