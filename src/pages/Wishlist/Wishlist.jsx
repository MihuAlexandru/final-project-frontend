import { useEffect, useMemo, useState } from "react";
import { mockProducts } from "../../../MockData/mockProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import EmptyWishlistState from "../../components/Wishlist/EmptyWishlistState/EmptyWishlistState";
import { getFavorites } from "../../utils/favorites";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const [favoriteIds, setFavoriteIds] = useState(() => getFavorites());

  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteIds(getFavorites());
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

  const favoriteProducts = useMemo(() => {
    const favoriteSet = new Set(favoriteIds);
    return mockProducts.filter((product) => favoriteSet.has(product.id));
  }, [favoriteIds]);

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
