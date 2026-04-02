import React from "react";
import { MapPin, X } from "lucide-react";
import styles from "./AddressModal.module.css";

const DUMMY_ADDRESSES = [
  {
    id: "addr_1",
    street: "Strada Palat",
    house_number: "Nr. 1, Bl. A",
    city: "Iasi",
    state: "Iasi",
    postal_code: "700032",
    country: "Romania",
  },
  {
    id: "addr_2",
    street: "Bulevardul Stefan cel Mare",
    house_number: "Nr. 10, Ap. 5",
    city: "Iasi",
    state: "Iasi",
    postal_code: "700028",
    country: "Romania",
  },
];

export default function AddressModal({ isOpen, onClose, onSelect }) {
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
          {DUMMY_ADDRESSES.map((addr) => (
            <div
              key={addr.id}
              className={styles.addressCard}
              onClick={() => onSelect(addr)}
            >
              <div className={styles.icon}>
                <MapPin size={18} strokeWidth={2} />
              </div>
              <div className={styles.details}>
                <p className={styles.street}>
                  {addr.street}, {addr.house_number}
                </p>
                <p className={styles.city}>
                  {addr.city}, {addr.state}, {addr.postal_code}
                </p>
                <p className={styles.country}>{addr.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
