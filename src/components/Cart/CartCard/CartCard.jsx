import style from "./CartCard.module.css";
import CartCardDetails from "./CartCardDetails";
import CartQuantityControl from "./CartQuantityControl";
import CartPriceBlock from "./CartPriceBlock";
import noImage from "../../../assets/no-image-available.png";

export default function CartCard({
  item,
  onRemove,
  onQuantityChange,
  onOpenProduct,
}) {
  const { id, name, price, quantity, image, stock } = item;

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
        <img
          src={image || noImage}
          alt={name}
          className={style.image}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = noImage;
          }}
        />
      </div>

      <CartCardDetails
        name={name}
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
