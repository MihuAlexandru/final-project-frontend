import styles from "./Product.module.css";
import productImg from "../../assets/dark-surface-illustration.jpg";
import Ratings from "../../components/Rating/Rating";
import Button from "../../components/UI/Button/Button";
import { getFavorites, toggleFavoriteInStorage } from "../../utils/favorites";
import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heartEmpty from "../../assets/heart.png";
import heartFilled from "../../assets/heart-filled.png";
import AddReview from "../../components/AddReview/AddReview";
import { getProductById } from "../../services/productService";
import { getProductReviews } from "../../services/reviewsService";

export default function Product() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      const [productData, reviewsData] = await Promise.all([
        getProductById(id),
        getProductReviews(id),
      ]);

      setProduct(productData);
      setReviews(reviewsData);

      if (productData?.id) {
        setIsFavorite(getFavorites().includes(productData?.id));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
            <Ratings valueProp={reviews?.average_rating || 0} />
            <h6>{reviews?.total_reviews || 0} ratings</h6>
            <div className={styles.infoWrapper}>
              <h4>Price: {product.price} Lei</h4>
              <h4>Quantity in stock: {product.stock_quantity}</h4>
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
          </section>
        </div>
      }
      <div className={styles.reviewsContainer}>
        <AddReview productId={id} onReviewAdded={() => fetchProduct()} />
        <h3>Customer Reviews</h3>
        {reviews?.items?.length > 0 ? (
          reviews.items.map((item) => (
            <div key={item.id} className={styles.reviewsItem}>
              <Ratings valueProp={item.rating} readOnly={true} />
              <p>
                User #{item.user_id} -{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to rate this product!</p>
        )}
      </div>
    </div>
  );
}
