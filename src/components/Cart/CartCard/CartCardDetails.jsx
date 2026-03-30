import style from "./CartCard.module.css";

export default function CartCardDetails({
  name,
  variant,
  stockExceeded,
  stock,
}) {
  return (
    <div className={style.details}>
      <h3 className={style.name}>{name}</h3>
      {variant && <p className={style.variant}>{variant}</p>}
      {stockExceeded && (
        <p className={style.stockWarning}>
          Only {stock} in stock - reduce quantity
        </p>
      )}
    </div>
  );
}
