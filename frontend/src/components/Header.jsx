import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "../stores/cartContext";

export default function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Check if user logged in
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("token");

  // secret sotcut → Shift + A
  useEffect(() => {
    function handleKey(e) {
      if (e.shiftKey && e.key === "A") {
        window.location.href = "/admin";
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-3">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyStore
        </Link>

        {/* NAVBAR */}
        <nav className="flex items-center space-x-6 text-gray-700 font-medium">

          {/* CART BUTTON */}
          <Link to="/cart" className="relative flex items-center gap-2 hover:text-blue-600">
            <FaShoppingCart size={22} />
            <span className="hidden md:inline">Cart</span>

            {cart.length > 0 && (
              <span
                className="
                  absolute -top-2 -right-3
                  bg-red-600 text-white text-xs px-2 py-0.5 rounded-full
                "
              >
                {cart.length}
              </span>
            )}
          </Link>

          {/* LOGGED IN USER */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">

              {/* USER NAME */}
              <span className="hidden md:block text-gray-800 font-semibold">
                Hi, {user?.fullName || "User"}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-600"
              >
                <FaSignOutAlt size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            /* LOGIN IF NOT LOGGED IN */
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-600">
              <FaUser size={22} />
              <span className="hidden md:inline">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
