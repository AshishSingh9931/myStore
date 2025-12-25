import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function getId(product) {
    return product._id || product.id;
  }

  function addToCart(product, qty = 1) {
    const productId = getId(product);

    setCart((prev) => {
      const found = prev.find((p) => getId(p) === productId);

      if (found) {
        return prev.map((p) =>
          getId(p) === productId ? { ...p, qty: p.qty + qty } : p
        );
      }

      return [...prev, { ...product, qty }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => getId(p) !== id));
  }

  function updateQty(id, qty) {
    setCart((prev) =>
      prev.map((p) => (getId(p) === id ? { ...p, qty } : p))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
