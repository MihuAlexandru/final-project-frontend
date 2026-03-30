import style from "./CartCard.module.css";

export default function CartCardDetails({ name, stockExceeded, stock }) {
  return (
    <div className={style.details}>
      <h3 className={style.name}>{name}</h3>
      {stockExceeded && (
        <p className={style.stockWarning}>
          Only {stock} in stock - reduce quantity
        </p>
      )}
    </div>
  );
}
