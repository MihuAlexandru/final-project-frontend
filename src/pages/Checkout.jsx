import React, { useState } from "react";
import CheckoutCartDetails from "../components/Checkout/CheckoutCartDetails";
import CheckoutForm from "../components/Checkout/CheckoutForm"; // Componenta cu input-urile tale
import styles from "./Checkout.module.css";

export default function Checkout() {
  const [total, setTotal] = useState(0);

  const handleOrderSubmit = (formData) => {
    // Aici colectăm totul pentru backend
    const finalPayload = {
      ...formData,
      total_price: total,
    };
    console.log("Comandă finală de trimis la FastAPI:", finalPayload);
    // await api.post('/orders', finalPayload);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalizare Comandă</h1>

      <div className={styles.layout}>
        {/* PARTEA STÂNGĂ: Formularul cu datele de livrare */}
        <div className={styles.mainContent}>
          <CheckoutForm onSubmit={handleOrderSubmit} />
        </div>

        {/* PARTEA DREAPTĂ: Sumarul coșului (Sidebar) */}
        <aside className={styles.sidebar}>
          <CheckoutCartDetails onTotalChange={(val) => setTotal(val)} />
        </aside>
      </div>
    </div>
  );
}
