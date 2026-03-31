import React, { useEffect, useState } from "react";
import styles from "./CheckoutCartDetails.module.css";
import { getCart } from "../../services/cartService";

export default function CheckoutCartDetails({ onTotalChange, onItemsLoad }) {
  const [cartData, setCartData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const data = await getCart();
        setCartData(data);

        if (onItemsLoad) {
          const itemsForOrder = data.items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            product: {
              id: item.id,
              name: item.name,
              price: item.price,
            },
          }));
          onItemsLoad(itemsForOrder);
        }

        if (onTotalChange) {
          onTotalChange(data.total);
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) return <div className={styles.container}>Loading cart...</div>;

  if (cartData.items.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Order Summary</h2>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🛒</div>
          <p className={styles.emptyTitle}>Your cart is empty</p>
          <p className={styles.emptySubtitle}>
            Please add some products before placing an order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>
      <div className={styles.itemList}>
        {cartData.items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <span className={styles.price}>
              {(item.price * item.quantity).toFixed(2)} RON
            </span>
          </div>
        ))}
      </div>
      <div className={styles.divider} />
      <div className={styles.totalRow}>
        <span>Total to pay</span>
        <span className={styles.totalAmount}>
          {cartData.total.toFixed(2)} RON
        </span>
      </div>
    </div>
  );
}
