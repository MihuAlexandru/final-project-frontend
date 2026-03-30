import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Navbar.module.css";
import exitIcon from "../../assets/exit.png";
import NavItems from "../NavItems/NavItems";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className={style.navbar}>
      <div className={`${style.left} ${style.desktop}`}>
        <NavItems
          position="left"
          closeMenu={closeMenu}
          isMobile={false}
          user={user}
        />
      </div>

      <div className={`${style.right} ${style.desktop}`}>
        <NavItems
          position="right"
          closeMenu={closeMenu}
          isMobile={false}
          user={user}
        />
        {user && (
          <span className={style.logout} onClick={handleLogout}>
            <img src={exitIcon} alt="Logout" />
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
          <NavItems
            position="left"
            closeMenu={closeMenu}
            isMobile={true}
            user={user}
          />
          <NavItems
            position="right"
            closeMenu={closeMenu}
            isMobile={true}
            user={user}
          />
          {user && (
            <span className={style.logout} onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
