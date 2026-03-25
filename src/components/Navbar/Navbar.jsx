import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <div className={style.navbarLinks}>
        <Link to="/">Home</Link>
        <Link to="/catalog">Shop</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
