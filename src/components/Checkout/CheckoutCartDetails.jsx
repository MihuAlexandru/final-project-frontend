import React, { useEffect, useState } from "react";
import styles from "./CheckoutCartDetails.module.css";

export default function CheckoutCartDetails({ onTotalChange }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const mockData = [
          {
            id: 101,
            quantity: 2,
            product: { name: "T-Shirt Genc Black", price: 120.0 },
          },
          {
            id: 102,
            quantity: 1,
            product: { name: "Jeans Premium Blue", price: 350.5 },
          },
        ];

        setCartItems(mockData);

        const total = mockData.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0,
        );

        if (onTotalChange) onTotalChange(total);
      } catch (error) {
        console.error("Eroare la încărcarea coșului:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [onTotalChange]);

  if (loading)
    return (
      <div className={styles.container}>Se încarcă detaliile coșului...</div>
    );

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sumar Comandă</h2>

      <div className={styles.itemList}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <h4>{item.product.name}</h4>
              <p>Cantitate: {item.quantity}</p>
            </div>
            <span className={styles.price}>
              {(item.product.price * item.quantity).toFixed(2)} RON
            </span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.totalRow}>
        <span>Total de plată</span>
        <span className={styles.totalAmount}>{calculateTotal()} RON</span>
      </div>
    </div>
  );
}
