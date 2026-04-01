import styles from "./EmptyOrderHistoryState.module.css";

export default function EmptyOrderHistoryState() {
  return (
    <div className={styles.emptyState}>
      <h2>No orders yet</h2>
      <p>Your order history will appear here once you place your first order.</p>
    </div>
  );
}