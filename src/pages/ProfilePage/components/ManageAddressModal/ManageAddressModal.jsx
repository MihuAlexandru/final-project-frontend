import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import {
  updateMyAddress,
  editAnAddress,
} from "../../../../services/addressService.js";
import Input from "../../../../components/UI/Input/Input.jsx";
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setAddressForm(addressToEdit || EMPTY_ADDRESS);
    }
  }, [open, addressToEdit]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    const addressValues = Object.values(addressForm);
    if (addressValues.some((v) => String(v).trim() === "")) {
      addToast({
        type: "warning",
        message: "Please fill in all address fields.",
      });
      setIsSaving(false);
      return;
    }

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

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formBody}>
            <section className={style.section}>
              <Input
                label="Street"
                type="text"
                name="street"
                value={addressForm.street}
                onChange={handleChange}
              />
              <div className={style.grid}>
                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={addressForm.city}
                  onChange={handleChange}
                />
                <Input
                  label="State / Region"
                  type="text"
                  name="state"
                  value={addressForm.state}
                  onChange={handleChange}
                />
              </div>
              <div className={style.grid}>
                <Input
                  label="Postal code"
                  type="text"
                  name="postal_code"
                  value={addressForm.postal_code}
                  onChange={handleChange}
                />
                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={addressForm.country}
                  onChange={handleChange}
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
