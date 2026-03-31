import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-available.png";
import { useCallback, useEffect, useState } from "react";
import heartEmpty from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";
import { getFavorites, toggleFavoriteInStorage } from "../../utils/favorites";
import { useToast } from "../../context/ToastContext";
import { useUser } from "../../context/UserContext";
import LoginPromptModal from "../LoginPromptModal/LoginPromptModal";
// const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProductCard({ product }) {
  const isOutOfStock = product.stock_quantity === 0;
  const isUnavailable = product.is_active === false;

  const { addToast } = useToast();
  const { user } = useUser();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    return user ? getFavorites(user.id).some((fav) => fav.id === product.id) : false;
  });

  useEffect(() => {
    setIsFavorite(user ? getFavorites(user.id).some((fav) => fav.id === product.id) : false);
  }, [user, product.id]);

  const toggleFavorite = useCallback(
    (e) => {
      e.preventDefault();

      if (!user) {
        setShowAuthModal(true);
        return;
      }

      toggleFavoriteInStorage(product, isFavorite, user.id);
      setIsFavorite((prev) => !prev);
    },
    [product, isFavorite, user],
  );

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isUnavailable) {
      addToast({
        type: "error",
        message: "This product is currently unavailable.",
      });
      return;
    }

    if (isOutOfStock) {
      addToast({
        type: "error",
        message: "This product is out of stock.",
      });
      return;
    }

    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      addToast({
        type: "success",
        message: `${product.name} was added to your cart!`,
      });
    } catch (error) {
      addToast({
        type: "error",
        message: "Failed to add product to cart. Please try again.",
      });
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  // TO BE MODIFIED
  // const rawImagePath = product.images?.[0]?.image_path;
  // const imageUrl = rawImagePath
  //   ? rawImagePath.startsWith("http")
  //     ? rawImagePath
  //     : `${API_URL}${rawImagePath}`
  //   : noImage;
  const imageUrl = noImage;

  return (
    <>
    <div
      className={`${styles.cardHoverWrapper} ${isUnavailable ? styles.unavailable : ""}`}
    >
      <Card>
        <div className={styles.productCardContainer}>
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
          <Link to={`/product/${product.id}`} className={styles.productLink}>
            <div className={styles.imageContainer}>
              <img
                src={imageUrl}
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
              {product?.price?.toLocaleString("ro-RO")} Lei
            </p>
          </div>
          <div className={styles.action}>
            <Button
              disabled={isOutOfStock || isUnavailable || isAddingToCart}
              onClick={handleAddToCart}
            >
              {isAddingToCart
                ? "Adding..."
                : isUnavailable
                  ? "Unavailable"
                  : isOutOfStock
                    ? "Out of stock"
                    : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
    <LoginPromptModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      </>
  );
}
