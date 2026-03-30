import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import shopIcon from "../../assets/shopping-cart.png";
import heartIcon from "../../assets/heart.png";
import userIcon from "../../assets/user.png";

const leftLinks = [
  { path: "/", label: "Home", auth: "always" },
  { path: "/catalog", label: "Shop", auth: "always" },
  { path: "/admin", label: "Admin Panel", auth: "admin" },
];

const rightLinks = [
  { path: "/wishlist", icon: heartIcon, label: "Wishlist", auth: "protected" },
  { path: "/cart", icon: shopIcon, label: "Cart", auth: "protected" },
  { path: "/profile", icon: userIcon, label: "Profile", auth: "protected" },
  { path: "/login", label: "Login", auth: "guest" },
  { path: "/signup", label: "Signup", auth: "guest" },
];

export default function NavItems({ closeMenu, position, isMobile }) {
  const { token } = useAuth();

  const list = position === "left" ? leftLinks : rightLinks;

  const filteredList = list.filter((item) => {
    if (item.auth === "always") return true;
    if (item.auth === "protected") return !!token;
    if (item.auth === "guest") return !token;
  });

  return (
    <>
      {filteredList.map((item, idx) => {
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
