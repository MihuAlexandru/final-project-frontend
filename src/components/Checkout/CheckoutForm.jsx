import React, { useState } from "react";
import { MapPin } from "lucide-react";
import styles from "./CheckoutForm.module.css";
import FormInput from "../UI/Input/FormInput";
import Button from "../UI/Button/FormButton";
import AddressModal from "./AddressModal";

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

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSelectAddress = (addr) => {
    setFormData({
      city: addr.city,
      street: addr.street,
      house_number: addr.house_number,
      postal_code: addr.postal_code,
      state: addr.state,
      country: addr.country,
      payment_type: formData.payment_type,
    });
    setErrors({});
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Delivery Details</h2>
        <button
          type="button"
          className={styles.chooseAddressBtn}
          onClick={() => setIsModalOpen(true)}
        >
          <MapPin size={18} />
          Choose saved address
        </button>
      </div>

      <div className={styles.inputGrid}>
        <FormInput
          id="country"
          label="Country"
          placeholder="e.g., Romania"
          value={formData.country}
          onChange={handleChange}
          error={errors.country}
        />

        <FormInput
          id="state"
          label="State"
          placeholder="e.g., Iasi"
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
        />

        <FormInput
          id="city"
          label="City"
          placeholder="e.g., Letcani"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />

        <FormInput
          id="postal_code"
          label="Postal Code"
          placeholder="e.g., 700001"
          value={formData.postal_code}
          onChange={handleChange}
          error={errors.postal_code}
        />

        <FormInput
          id="street"
          label="Street"
          placeholder="e.g., Street Cuza Voda"
          className={styles.fullWidth}
          value={formData.street}
          onChange={handleChange}
          error={errors.street}
        />

        <FormInput
          id="house_number"
          label="Nr. / Flat / Ap."
          placeholder="e.g., Nr. 5, Bl. A, Ap. 12"
          value={formData.house_number}
          onChange={handleChange}
          error={errors.house_number}
        />
      </div>

      <h2 className={styles.paymentSectionTitle}>Payment Method</h2>

      <div className={styles.paymentContainer}>
        <FormInput
          id="payment_type"
          type="select"
          label="Choose payment method"
          value={formData.payment_type}
          onChange={handleChange}
          error={errors.payment_type}
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

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectAddress}
      />
    </form>
  );
}

function validate(data) {
  const newErrors = {};

  if (!data.country.trim()) newErrors.country = "Country is required";
  if (!data.state.trim()) newErrors.state = "State is required";
  if (!data.city.trim()) newErrors.city = "City is required";

  const postalRegex = /^\d{6}$/;
  if (!data.postal_code.trim()) {
    newErrors.postal_code = "Postal code is required";
  } else if (!postalRegex.test(data.postal_code.trim())) {
    newErrors.postal_code = "Postal code must be exactly 6 digits";
  }

  if (!data.street.trim()) newErrors.street = "Street name is required";
  if (!data.house_number.trim()) {
    newErrors.house_number = "House number is required";
  }

  if (!["cash", "card"].includes(data.payment_type)) {
    newErrors.payment_type = "Invalid payment method";
  }

  return newErrors;
}
