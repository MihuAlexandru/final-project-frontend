import { Link } from "react-router-dom";
import shopIcon from "../../assets/shopping-cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";
import exitIcon from "../../assets/exit.png";

export default function Navbar() {
  const isUser = true;
  const isSuperadmin = true;

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={style.navbar}>
      <div className={style.left}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/catalog" onClick={closeMenu}>
          Shop
        </Link>
        {isSuperadmin && (
          <Link to="/admin" onClick={closeMenu}>
            Admin Panel
          </Link>
        )}
      </div>

      <div className={style.right}>
        <Link to="/wishlist" onClick={closeMenu}>
          <img src={heartIcon} alt="" />
        </Link>

        {isUser ? (
          <>
            <Link to="/cart" onClick={closeMenu}>
              <img src={shopIcon} alt="" />
            </Link>

            <Link to="/profile" onClick={closeMenu}>
              <img src={userIcon} alt="" />
            </Link>

            <span>
              <img src={exitIcon} alt="" />
            </span>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              Signup
            </Link>
          </>
        )}
      </div>

      <button
        className={style.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className={style.mobileMenu}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/catalog" onClick={closeMenu}>
            Shop
          </Link>
          {isSuperadmin && (
            <Link to="/admin" onClick={closeMenu}>
              Admin Panel
            </Link>
          )}

          <Link to="/wishlist" onClick={closeMenu}>
            Wishlist
          </Link>

          {isUser ? (
            <>
              <Link to="/cart" onClick={closeMenu}>
                Cart
              </Link>
              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>
              <span className={style.logout}>Logout</span>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
import { useState } from "react";
import style from "./Navbar.module.css";
