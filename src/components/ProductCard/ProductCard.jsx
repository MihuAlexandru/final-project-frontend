import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-available.png";
import { useCallback, useState } from "react";
import heartEmpty from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";
import { getFavorites, toggleFavoriteInStorage } from "../../utils/favorites";
import { Pencil } from "lucide-react";

export default function ProductCard({ product, isAdmin, onEdit }) {
  const isOutOfStock = product.stock_quantity === 0;
  const isUnavailable = product.is_available === false;
  const [isFavorite, setIsFavorite] = useState(() => {
    return getFavorites().includes(product.id);
  });

  const toggleFavorite = useCallback(
    (e) => {
      e.preventDefault();
      toggleFavoriteInStorage(product.id, isFavorite);
      setIsFavorite((prev) => !prev);
    },
    [product.id, isFavorite],
  );
  return (
    <div
      className={`${styles.cardHoverWrapper} ${isUnavailable ? styles.unavailable : ""}`}
    >
      <Card>
        <div className={styles.productCardContainer}>
          <div className={styles.topActions}>
            <button
              className={`${styles.iconBtn} ${isFavorite ? styles.favoriteActive : ""}`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onClick={toggleFavorite}
            >
              <img
                src={isFavorite ? heartFilled : heartEmpty}
                alt="Favorite Icon"
                className={styles.heartIcon}
              />
            </button>

            {isAdmin && (
              <button
                className={styles.editBtn}
                onClick={() => onEdit(product.id)}
                title="Edit Product"
              >
                <Pencil size={18} />
              </button>
            )}
          </div>
          <Link to={`/product/${product.id}`} className={styles.productLink}>
            <div className={styles.imageContainer}>
              <img
                src={product.images?.[0]?.url || noImage}
                alt={product.name}
                className={styles.image}
                loading="lazy"
              />
            </div>
            <h3 className={styles.title}>{product.name}</h3>
          </Link>
          <div className={styles.details}>
            {isUnavailable ? (
              <p className={styles.stock} style={{ color: "grey" }}>
                Unavailable
              </p>
            ) : product.stock_quantity > 0 && product.stock_quantity <= 5 ? (
              <p className={styles.stock}>
                Only {product.stock_quantity} products left!
              </p>
            ) : isOutOfStock ? (
              <p className={styles.stock} style={{ color: "grey" }}>
                Out of stock!
              </p>
            ) : (
              <p className={styles.stock} style={{ color: "green" }}>
                In stock ({product.stock_quantity})
              </p>
            )}
            <p className={styles.price}>
              {product.price.toLocaleString("ro-RO")} Lei
            </p>
          </div>
          <div className={styles.action}>
            <Button disabled={isOutOfStock || isUnavailable}>
              {isUnavailable
                ? "Unavailable"
                : isOutOfStock
                  ? "Out of stock"
                  : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
