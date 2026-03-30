import { Link } from "react-router-dom";

import shopIcon from "../../assets/shopping-cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";

const leftLinks = [
  { path: "/", label: "Home" },
  { path: "/catalog", label: "Shop" },
  { path: "/admin", label: "Admin Panel", adminOnly: true },
];

const rightLinks = [
  { path: "/wishlist", icon: heartIcon, label: "Wishlist", auth: true },
  { path: "/cart", icon: shopIcon, label: "Cart", auth: true },
  { path: "/profile", icon: userIcon, label: "Profile", auth: true },
  { path: "/login", label: "Login", guest: true },
  { path: "/signup", label: "Signup", guest: true },
];

export default function NavItems({ closeMenu, position, isMobile, user }) {
  const list = position === "left" ? leftLinks : rightLinks;

  const filtered = list.filter((item) => {
    if (item.adminOnly) return user?.role === "admin";
    if (item.auth) return !!user;
    if (item.guest) return !user;
    return true;
  });

  return (
    <>
      {filtered.map((item, idx) => {
        return (
          <Link key={idx} to={item.path} onClick={closeMenu}>
            {isMobile ? (
              item.label || item.path.replace("/", "")
            ) : item.icon ? (
              <img src={item.icon} alt="" />
            ) : (
              item.label
            )}
          </Link>
        );
      })}
    </>
  );
}
