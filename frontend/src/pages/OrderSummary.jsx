import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSummary() {
  const location = useLocation();
  const order = location.state;

  if (!order) {
    return (
      <div className="text-center text-xl mt-20 text-gray-600">
        No order found.
        <br />
        <Link to="/" className="text-blue-600 underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Order Summary
      </h1>

      <div className="space-y-2 mb-6">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-4">Purchased Items</h2>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-medium text-gray-700">{item.title}</span>
            <span className="text-gray-800">${item.price}</span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="text-right text-xl font-bold text-gray-800 mb-6">
        Total: ${order.total}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => window.print()}
          className="w-1/2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Print / Save PDF
        </button>

        <Link
          to="/"
          className="w-1/2 bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition"
        >
          Back Home
        </Link>
      </div>

    </div>
  );
}
