import { useState } from "react";
import style from "./Navbar.module.css";
import exitIcon from "../../assets/exit.png";
import NavItems from "../NavItems/NavItems";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={style.navbar}>
      <div className={`${style.left} ${style.desktop}`}>
        <NavItems position="left" closeMenu={closeMenu} isMobile={false} />
      </div>

      <div className={`${style.right} ${style.desktop}`}>
        <NavItems position="right" closeMenu={closeMenu} isMobile={false} />
        <span className={style.logout} onClick={closeMenu}>
          <img src={exitIcon} alt="" />
        </span>
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
          <NavItems position="right" closeMenu={closeMenu} isMobile={true} />
          <span className={style.logout} onClick={closeMenu}>
            Logout
          </span>
        </div>
      )}
    </nav>
  );
}
