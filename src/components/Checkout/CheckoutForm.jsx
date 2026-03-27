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
    phone: "",
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
      <h2 className={styles.sectionTitle}>Detalii Livrare</h2>

      <div className={styles.inputGrid}>
        <FormInput
          id="city"
          label="Oraș"
          placeholder="ex: București"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <FormInput
          id="postal_code"
          label="Cod Poștal"
          placeholder="ex: 010101"
          value={formData.postal_code}
          onChange={handleChange}
          required
        />

        <FormInput
          id="street"
          label="Stradă"
          placeholder="Numele străzii"
          className={styles.fullWidth}
          value={formData.street}
          onChange={handleChange}
          required
        />

        <FormInput
          id="house_number"
          label="Nr. / Bloc / Ap."
          placeholder="ex: Nr. 5, Bl. A, Sc. 1, Ap. 12"
          value={formData.house_number}
          onChange={handleChange}
          required
        />

        <FormInput
          id="phone"
          label="Telefon"
          type="tel"
          placeholder="07xx xxx xxx"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <h2 className={styles.sectionTitle}>Metodă de Plată</h2>
      <div className={styles.paymentContainer}>
        <FormInput
          id="payment_type"
          type="select"
          label="Alege modalitatea de plată"
          value={formData.payment_type}
          onChange={handleChange}
          options={[
            { value: "cash", label: "Plată la livrare (Cash)" },
            { value: "card", label: "Card Online" },
          ]}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" className={styles.submitBtn}>
          Finalizează Comanda
        </Button>
      </div>
    </form>
  );
}
