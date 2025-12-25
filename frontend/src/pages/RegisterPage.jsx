import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration Successful!");
      navigate("/login");

    } catch (err) {
      setError("Something went wrong!");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-5">

        <div>
          <label className="text-gray-700">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition text-lg"
        >
          Create Account
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600">
        Already have an account?
        <Link to="/login" className="text-blue-600 ml-2 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
