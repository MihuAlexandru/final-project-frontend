import { Link } from "react-router-dom";

import shopIcon from "../../assets/shopping-cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";

const leftLinks = [
  { path: "/", label: "Home" },
  { path: "/catalog", label: "Shop" },
  { path: "/admin", label: "Admin Panel" },
];

const rightLinks = [
  { path: "/wishlist", icon: heartIcon, label: "Wishlist" },
  { path: "/cart", icon: shopIcon, label: "Cart" },
  { path: "/profile", icon: userIcon, label: "Profile" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Signup" },
];

export default function NavItems({ closeMenu, position, isMobile }) {
  const list = position === "left" ? leftLinks : rightLinks;

  return (
    <>
      {list.map((item, idx) => {
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
