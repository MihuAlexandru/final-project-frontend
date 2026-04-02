import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import {
  updateMyAddress,
  editAnAddress,
} from "../../../../services/addressService.js";
import FormInput from "../../../../components/UI/Input/FormInput.jsx";
import style from "../EditProfileModal/EditProfileModal.module.css";

const EMPTY_ADDRESS = {
  street: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

export default function ManageAddressModal({ open, onClose, addressToEdit }) {
  const { user, setUser } = useUser();
  const { addToast } = useToast();

  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setAddressForm(addressToEdit || EMPTY_ADDRESS);
      setErrors({});
    }
  }, [open, addressToEdit]);

  if (!open) return null;

  function validateAddress(data) {
    const newErrors = {};

    if (!(data.country || "").trim()) newErrors.country = "Country is required";
    if (!(data.state || "").trim())
      newErrors.state = "State / Region is required";
    if (!(data.city || "").trim()) newErrors.city = "City is required";

    const postalRegex = /^\d{6}$/;
    const postalCode = (data.postal_code || "").trim();

    if (!postalCode) {
      newErrors.postal_code = "Postal code is required";
    } else if (!postalRegex.test(postalCode)) {
      newErrors.postal_code = "Postal code must be 6 digits";
    }

    if (!(data.street || "").trim()) {
      newErrors.street = "Street address is required";
    }

    return newErrors;
  }

  function validateField(name, value) {
    const fieldErrors = validateAddress({ ...addressForm, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name] || null,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    validateField(name, value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateAddress(addressForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);

    try {
      if (addressToEdit?.id) {
        const updated = await editAnAddress(addressToEdit.id, addressForm);
        setUser({
          ...user,
          addresses: user.addresses.map((a) =>
            a.id === updated.id ? updated : a,
          ),
        });
        addToast({ type: "success", message: "Address updated successfully!" });
      } else {
        const newlyCreated = await updateMyAddress(addressForm);
        setUser({
          ...user,
          addresses: [...(user.addresses || []), newlyCreated],
        });
        addToast({ type: "success", message: "Address added successfully!" });
      }
      onClose();
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <header className={style.modalHeader}>
          <h2 className={style.title}>
            {addressToEdit ? "Edit Address" : "Add Address"}
          </h2>
          <button className={style.closeBtn} onClick={onClose}>
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className={style.form} noValidate>
          <div className={style.formBody}>
            <section className={style.section}>
              <FormInput
                id="street"
                label="Street"
                type="text"
                name="street"
                placeholder="e.g., Strada Aristide Demetriade nr. 1"
                value={addressForm.street}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.street}
              />
              <div className={style.grid}>
                <FormInput
                  id="city"
                  label="City"
                  type="text"
                  name="city"
                  placeholder="e.g., Timisoara"
                  value={addressForm.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.city}
                />
                <FormInput
                  id="state"
                  label="State / Region"
                  type="text"
                  name="state"
                  placeholder="e.g., Timis"
                  value={addressForm.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.state}
                />
              </div>
              <div className={style.grid}>
                <FormInput
                  id="postal_code"
                  label="Postal code"
                  type="text"
                  name="postal_code"
                  placeholder="e.g., 300627"
                  value={addressForm.postal_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.postal_code}
                />
                <FormInput
                  id="country"
                  label="Country"
                  type="text"
                  name="country"
                  placeholder="e.g., Romania"
                  value={addressForm.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.country}
                />
              </div>
            </section>
          </div>
          <footer className={style.footer}>
            <button
              type="button"
              className={style.cancelBtn}
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" className={style.saveBtn} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save Address"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
