import React, { useState } from "react";
import CheckoutCartDetails from "../components/Checkout/CheckoutCartDetails";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import styles from "./Checkout.module.css";
import { updateMyAddress } from "../services/addressService";
import { placeOrder } from "../services/orderService";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import { PartyPopper } from "lucide-react";

export default function Checkout() {
  const [itemsToOrder, setItemsToOrder] = useState([]);
  const [orderResponse, setOrderResponse] = useState(null);
  const navigate = useNavigate();

  const { user, setUser } = useUser();

  const handleOrderSubmit = async (formData) => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    try {
      const { payment_type, ...addressData } = formData;

      const savedAddress = await updateMyAddress(addressData);
      const finalAddressId = savedAddress.id;

      if (setUser && user) {
        setUser({
          ...user,
          addresses: [...(user.addresses || []), savedAddress],
        });
      }

      const orderPayload = {
        items: itemsToOrder.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        payment_type: payment_type,
        shipping_address_id: finalAddressId,
        billing_address_id: finalAddressId,
      };

      const response = await placeOrder(orderPayload);
      setOrderResponse(response);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error.message || "Oops, order failed!");
    }
  };

  if (orderResponse) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <PartyPopper size={80} strokeWidth={1.5} />
          </div>
          <h1 className={styles.successTitle}>Order Placed Successfully!</h1>
          <p className={styles.successText}>
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
          <div className={styles.orderIdBox}>
            Order ID:{" "}
            <span className={styles.idNumber}>#{orderResponse.id}</span>
          </div>

          <div className={styles.successActions}>
            <Button onClick={() => navigate("/")} className={styles.blackBtn}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Place Order</h1>
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <CheckoutForm onSubmit={handleOrderSubmit} />
        </div>
        <aside className={styles.sidebar}>
          <CheckoutCartDetails onItemsLoad={setItemsToOrder} />
        </aside>
      </div>
    </div>
  );
}
