import { createRoot } from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Product from "./pages/ProductPage/Product.jsx";
import Profile from "./pages/ProfilePage/ProfilePage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import "./styles/variables.css";
import "./styles/globals.css";
import Layout from "./layouts/Layout.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ToastContainer from "./components/UI/Toast/ToastContainer.jsx";
import { mockProducts } from "../MockData/mockProducts.js";
import { UserProvider } from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<Product products={mockProducts}/>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <ToastContainer />
      </ToastProvider>
    </UserProvider>
  </BrowserRouter>,
);
