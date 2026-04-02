import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import EmptyWishlistState from "../../components/Wishlist/EmptyWishlistState/EmptyWishlistState";
import { getFavorites } from "../../utils/favorites";
import styles from "./Wishlist.module.css";
import { useUser } from "../../context/UserContext";

export default function Wishlist() {
  const { user } = useUser();
  const [favoriteProducts, setFavoriteProducts] = useState(() =>
    getFavorites(user?.id));

  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteProducts(getFavorites(user?.id));
    };

    window.addEventListener("focus", syncFavorites);
    window.addEventListener("storage", syncFavorites);
    window.addEventListener("favoritesUpdated", syncFavorites);

    return () => {
      window.removeEventListener("focus", syncFavorites);
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("favoritesUpdated", syncFavorites);
    };
  }, []);

  return (
    <div className={styles.wishlistPage}>
      <h1 className={styles.pageTitle}>Wishlist</h1>

      {favoriteProducts.length === 0 ? (
        <EmptyWishlistState />
      ) : (
        <div className={styles.grid}>
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
