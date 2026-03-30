import style from "./CartCard.module.css";
import CartCardDetails from "./CartCardDetails";
import CartQuantityControl from "./CartQuantityControl";
import CartPriceBlock from "./CartPriceBlock";

export default function CartCard({
  item,
  onRemove,
  onQuantityChange,
  onOpenProduct,
}) {
  const { id, name, variant, price, quantity, image, stock } = item;

  const stockExceeded = stock != null && quantity > stock;

  return (
    <div
      className={`${style.card} ${stockExceeded ? style.cardError : ""}`}
      onClick={() => onOpenProduct(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenProduct(id);
        }
      }}
      aria-label={`Open ${name}`}
    >
      <div className={style.imageWrapper}>
        <img src={image} alt={name} className={style.image} />
      </div>

      <CartCardDetails
        name={name}
        variant={variant}
        stockExceeded={stockExceeded}
        stock={stock}
      />

      <CartQuantityControl
        id={id}
        quantity={quantity}
        stockExceeded={stockExceeded}
        onQuantityChange={onQuantityChange}
      />

      <CartPriceBlock price={price} quantity={quantity} />

      <button
        className={style.remove}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(id);
        }}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
}
