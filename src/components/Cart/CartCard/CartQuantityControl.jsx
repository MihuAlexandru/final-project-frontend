import style from "./CartCard.module.css";

export default function CartQuantityControl({
  id,
  quantity,
  stockExceeded,
  onQuantityChange,
}) {
  return (
    <div className={style.controls}>
      <div className={`${style.qty} ${stockExceeded ? style.qtyError : ""}`}>
        <button
          className={style.qtyBtn}
          onClick={(event) => {
            event.stopPropagation();
            onQuantityChange(id, quantity - 1);
          }}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={style.qtyValue}>{quantity}</span>
        <button
          className={style.qtyBtn}
          onClick={(event) => {
            event.stopPropagation();
            onQuantityChange(id, quantity + 1);
          }}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
