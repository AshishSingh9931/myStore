import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");
      navigate("/");
    } catch (err) {
      setError("Something went wrong!");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">

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
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition text-lg"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-5 text-gray-600">
        Don’t have an account?
        <Link to="/register" className="text-blue-600 ml-2 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
