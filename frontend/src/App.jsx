import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { CartProvider } from "./stores/cartContext";

import AdminHome from "./pages/admin/AdminHome";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";

import OrderSummary from "./pages/OrderSummary";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />

          <main className="container mx-auto flex-1 p-6">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/category/:category" element={<CategoryPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/admin/edit/:id" element={<EditProduct />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/order-summary" element={<OrderSummary />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
