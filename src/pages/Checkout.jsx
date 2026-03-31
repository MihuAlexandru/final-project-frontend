import React, { useState } from "react";
import CheckoutCartDetails from "../components/Checkout/CheckoutCartDetails";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import styles from "./Checkout.module.css";
import { updateMyAddress } from "../services/addressService";
import { placeOrder } from "../services/orderService";
import { getMyProfile } from "../services/userService";

export default function Checkout() {
  const [itemsToOrder, setItemsToOrder] = useState([]);

  const handleOrderSubmit = async (formData) => {
    try {
      const { payment_type, ...addressData } = formData;

      await updateMyAddress(addressData);
      const userProfile = await getMyProfile();
      const finalAddressId = userProfile.address_id;

      const orderPayload = {
        items: itemsToOrder.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        payment_type: payment_type,
        shipping_address_id: finalAddressId,
        billing_address_id: finalAddressId,
      };

      await placeOrder(orderPayload);
      alert("The order was placed successfully!");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Oops, unfortunately the order could not be placed!");
    }
  };

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
