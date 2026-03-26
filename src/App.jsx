import { createRoot } from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Catalog from "./pages/Catalog.jsx";
import Product from "./pages/Product.jsx";
import Profile from "./pages/Profile.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import AdminPanel from "./pages/AdminPanelPage/AdminPanel.jsx";
import "./styles/variables.css";
import "./styles/globals.css";
import Layout from "./layouts/Layout.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ToastContainer from "./components/UI/Toast/ToastContainer.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<Catalog />} />
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
      <ToastContainer />
    </ToastProvider>
  </BrowserRouter>,
);
