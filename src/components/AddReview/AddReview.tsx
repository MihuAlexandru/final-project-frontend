import { useState } from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import styles from "./AddReview.module.css";
import Button from "../UI/Button/Button";
import { useToast } from "../../context/ToastContext";
import { addProductReview } from "../../services/reviewsService";

// @ts-ignore
export default function AddReview({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addProductReview(productId, rating);
      addToast({ type: "success", message: "Review submitted successfully!" });
      setRating(0);
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error(error);
      addToast({
        type: "error",
        message: "Failed to submit review. Make sure you are logged in.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <h6>Add a Review</h6>

      <h3>Your Rating:</h3>
      <Rating
        name="add-rating"
        value={rating}
        precision={0.5}
        onChange={(event, newValue) => setRating(newValue ?? 0)}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      <Button
        className={styles.btn}
        onClick={handleSubmit}
        disabled={isSubmitting || rating === 0}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
