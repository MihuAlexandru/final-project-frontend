import { useEffect } from "react";
import style from "./OrderDetailsModal.module.css";

export default function OrderDetailsModal({ open, onClose, order, loading }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <h2>Order #{order?.id} Details</h2>
          <button className={style.closeBtn} onClick={onClose}>×</button>
        </div>
        <div className={style.content}>
          {loading ? (
            <p>Loading...</p>
          ) : order ? (
            <>
              <div className={style.orderInfo}>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment:</strong> {order.payment_type}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                {order.shipping_address && (
                  <div className={style.address}>
                    <h4>Shipping Address</h4>
                    <div>
                      <p>{order.shipping_address.street}</p>
                      <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}</p>
                      <p>{order.shipping_address.country}</p>
                    </div>
                  </div>
                )}
                {order.billing_address && (
                  <div className={style.address}>
                    <h4>Billing Address</h4>
                    <div>
                      <p>{order.billing_address.street}</p>
                      <p>{order.billing_address.city}, {order.billing_address.state} {order.billing_address.postal_code}</p>
                      <p>{order.billing_address.country}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.items}>
                <h3>Items</h3>
                {order.items.map((item, index) => (
                  <div key={index} className={style.item}>
                    <p><strong>{item.name}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price_per_piece.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Error loading order details.</p>
          )}
        </div>
      </div>
    </div>
  );
}