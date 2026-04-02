import React, { useState, useEffect } from "react";
import { MapPin, X, Trash2 } from "lucide-react";
import styles from "./AddressModal.module.css";
import { getMyAddresses, deleteMyAddress } from "../../services/addressService";
import { useUser } from "../../context/UserContext";
import { useToast } from "../../context/ToastContext";

export default function AddressModal({ isOpen, onClose, onSelect }) {
  const [addresses, setAddresses] = useState([]);
  const { setUser, user } = useUser();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchAddresses();
    }
  }, [isOpen]);

  const fetchAddresses = async () => {
    try {
      const data = await getMyAddresses();
      setAddresses(data);

      if (setUser && user) {
        setUser({ ...user, addresses: data });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (e, addressId) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      await deleteMyAddress(addressId);

      setAddresses((prev) => prev.filter((a) => a.id !== addressId));

      if (setUser && user) {
        setUser({
          ...user,
          addresses: user.addresses.filter((a) => a.id !== addressId),
        });
      }

      addToast({
        type: "success",
        message: "Address deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message || "Failed to delete address.",
        duration: 5000,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Select Delivery Address</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.addressList}>
          {addresses && addresses.length > 0 ? (
            addresses.map((addr) => (
              <div
                key={addr.id}
                className={styles.addressCard}
                onClick={() => onSelect(addr)}
              >
                <div className={styles.icon}>
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <div className={styles.details}>
                  <p className={styles.street}>{addr.street}</p>
                  <p className={styles.city}>
                    {addr.city}, {addr.state}, {addr.postal_code}
                  </p>
                </div>

                <button
                  className={styles.deleteBtn}
                  onClick={(e) => handleDelete(e, addr.id)}
                  title="Delete address"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noAddresses}>No saved addresses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
