import Button from "../UI/Button/Button";
import style from "./OrderSummary.module.css";

export default function OrderSummary({
  subtotal,
  shipping,
  total,
  onCheckout,
  checkingOut,
  isDisabled,
}) {
  return (
    <aside className={style.summary}>
      <h2 className={style.summaryTitle}>Order Summary</h2>

      <div className={style.summaryRow}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className={style.summaryRow}>
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>

      <hr className={style.divider} />

      <div className={`${style.summaryRow} ${style.totalRow}`}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button
        className={style.checkoutBtn}
        onClick={onCheckout}
        disabled={checkingOut || isDisabled}
      >
        {checkingOut ? "Checking stock…" : "Proceed to Checkout"}
      </Button>
    </aside>
  );
}
