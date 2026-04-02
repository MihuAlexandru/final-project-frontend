import styles from "./Product.module.css";
import productImg from "../../assets/dark-surface-illustration.jpg";
import Ratings from "../../components/Rating/Rating";
import Button from "../../components/UI/Button/Button";
import { getFavorites, toggleFavoriteInStorage } from "../../utils/favorites";
import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heartEmpty from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

export default function Product() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { refreshCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);

        if (data && data.id) {
          setIsFavorite(getFavorites().includes(data.id));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const toggleFavorite = useCallback(
    (e) => {
      e.preventDefault();
      if (!product) return;
      toggleFavoriteInStorage(product.id, isFavorite);
      setIsFavorite((prev) => !prev);
    },
    [product?.id, isFavorite],
  );

  if (loading || !product) {
    return (
      <div className={styles.container}>Product information is loading</div>
    );
  }

  const isOutOfStock = product.stock_quantity === 0;
  const isUnavailable = product.is_available === false;

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    try {
      await addToCart(product.id, 1);
      refreshCart();
      addToast({ type: "success", message: `${product.name} was added to your cart!` });
    } catch (error) {
      addToast({ type: "error", message: error.message || "Failed to add to cart." });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={styles.container}>
      {
        <div className={styles.card}>
          <section className={styles.leftPart}>
            <h1>{product.name}</h1>
            <h3>{product.category}</h3>
            <div className={styles.imgWrapper}>
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].image_path
                    : productImg
                }
                alt="Product picture"
              />
            </div>
          </section>
          <section className={styles.rightPart}>
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
            <h2>Product specifications</h2>
            <p>{product.description}</p>
            <Ratings />
            <h6>[number] ratings</h6>
            <div className={styles.infoWrapper}>
              <h4>Price: {product.price} Lei</h4>
              <h4>Quantity in stock: {product.stock_quantity}</h4>
            </div>
            <div className={styles.action}>
              <Button
                disabled={isOutOfStock || isUnavailable || isAddingToCart}
                onClick={handleAddToCart}
              >
                {isUnavailable
                  ? "Unavailable"
                  : isOutOfStock
                    ? "Out of stock"
                    : isAddingToCart
                      ? "Adding..."
                      : "Add to Cart"}
              </Button>
            </div>
          </section>
        </div>
      }
    </div>
  );
}
