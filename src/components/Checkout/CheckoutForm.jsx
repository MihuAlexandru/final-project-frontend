import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import FormInput from "../UI/Input/FormInput";
import Button from "../UI/Button/FormButton";

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    house_number: "",
    postal_code: "",
    state: "",
    country: "",
    payment_type: "cash",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.sectionTitle}>Delivery Details</h2>

      <div className={styles.inputGrid}>
        <FormInput
          id="country"
          label="Country"
          placeholder="e.g., Romania"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <FormInput
          id="state"
          label="State"
          placeholder="e.g., Iasi"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <FormInput
          id="city"
          label="City"
          placeholder="e.g., Letcani"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <FormInput
          id="postal_code"
          label="Postal Code"
          placeholder="e.g., 700001"
          value={formData.postal_code}
          onChange={handleChange}
          required
        />

        <FormInput
          id="street"
          label="Street"
          placeholder="e.g., Street Cuza Voda"
          className={styles.fullWidth}
          value={formData.street}
          onChange={handleChange}
          required
        />

        <FormInput
          id="house_number"
          label="Nr. / Flat / Ap."
          placeholder="e.g., Nr. 5, Bl. A, Ap. 12"
          value={formData.house_number}
          onChange={handleChange}
          required
        />
      </div>

      <h2 className={styles.sectionTitle}>Payment Method</h2>
      <div className={styles.paymentContainer}>
        <FormInput
          id="payment_type"
          type="select"
          label="Choose payment method"
          value={formData.payment_type}
          onChange={handleChange}
          options={[
            { value: "cash", label: "Cash on delivery" },
            { value: "card", label: "Card" },
          ]}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" className={styles.submitBtn}>
          Send Order
        </Button>
      </div>
    </form>
  );
}
