import { useState } from "react";
import style from "./Navbar.module.css";
import exitIcon from "../../assets/exit.png";
import NavItems from "../NavItems/NavItems";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout(() => {
      if (closeMenu) closeMenu();
      navigate("/");
    });
  };

  return (
    <nav className={style.navbar}>
      <div className={`${style.left} ${style.desktop}`}>
        <NavItems position="left" closeMenu={closeMenu} isMobile={false} />
      </div>

      <div className={`${style.right} ${style.desktop}`}>
        <NavItems position="right" closeMenu={closeMenu} isMobile={false} />
        {token && (
          <span className={style.logout} onClick={closeMenu}>
            <img src={exitIcon} alt="" />
          </span>
        )}
      </div>

      <button
        className={style.menuButton}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      {menuOpen && (
        <div className={style.mobileMenu}>
          <NavItems position="left" closeMenu={closeMenu} isMobile={true} />
          <NavItems position="right" closeMenu={closeMenu} isMobile={true} />(
          <span className={style.logout} onClick={handleLogout}>
            Logout
          </span>
          )
        </div>
      )}
    </nav>
  );
}
