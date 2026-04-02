import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService.js";
import { useUser } from "./UserContext.jsx";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }
    getCart()
      .then(({ items }) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => setCartCount(0));
  }, [user]);

  function refreshCart() {
    if (!user) return;
    getCart()
      .then(({ items }) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch(() => {});
  }

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
