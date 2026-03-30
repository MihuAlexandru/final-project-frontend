import styles from "./EmptyWishlistState.module.css";

export default function EmptyWishlistState() {
  return (
    <div className={styles.emptyState}>
      <h2>No favorites yet</h2>
      <p>Tap the heart icon on any product in the catalog to save it here.</p>
    </div>
  );
}
