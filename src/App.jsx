import { createRoot } from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import "./styles/variables.css";
import "./styles/globals.css";
import Layout from "./layouts/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Layout>
  </BrowserRouter>,
);
