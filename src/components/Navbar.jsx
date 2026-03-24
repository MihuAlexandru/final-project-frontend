import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Link to="/">Catalog</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}
