import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  async function deleteOrder(id) {
    if (!confirm("Are you sure you want to delete this order?")) return;

    await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "DELETE",
    });

    setOrders(orders.filter((order) => order._id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow border relative"
          >
            <button
              onClick={() => deleteOrder(order._id)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 
                         text-white p-2 rounded-full shadow transition"
            >
              <FaTrash />
            </button>

            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{order.userName}</h2>
              <p className="text-gray-600">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <p className="text-gray-700 mb-3">{order.userEmail}</p>

            <h3 className="font-semibold mt-3">Items:</h3>
            <ul className="mt-2 space-y-1">
              {order.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between text-gray-700 border-b pb-1"
                >
                  <span>{item.title}</span>
                  <span>Qty: {item.qty}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>

            <p className="font-bold text-blue-600 text-lg mt-4">
              Total: ₹{order.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
