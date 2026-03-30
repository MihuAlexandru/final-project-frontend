import React, { useEffect, useState } from "react";
import styles from "./CheckoutCartDetails.module.css";
import { getProductById } from "../../services/productService";

export default function CheckoutCartDetails({ onTotalChange, onItemsLoad }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealProducts = async () => {
      try {
        setLoading(true);

        const [prod1, prod2] = await Promise.all([
          getProductById(1),
          getProductById(2),
        ]);

        const realData = [
          { id: 101, quantity: 2, product: prod1 },
          { id: 102, quantity: 1, product: prod2 },
        ];

        setCartItems(realData);
        if (onItemsLoad) onItemsLoad(realData);

        const total = realData.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0,
        );

        if (onTotalChange) onTotalChange(total);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealProducts();
  }, [onTotalChange, onItemsLoad]);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  if (loading) return <div className={styles.container}>Loading cart...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.itemList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <h4>{item.product.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <span className={styles.price}>
              {(item.product.price * item.quantity).toFixed(2)} RON
            </span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span>Total to pay</span>
        <span className={styles.totalAmount}>{calculateTotal()} RON</span>
      </div>
    </div>
  );
}
