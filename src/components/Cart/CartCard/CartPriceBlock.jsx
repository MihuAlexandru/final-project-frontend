import style from "./CartCard.module.css";

export default function CartPriceBlock({ price, quantity }) {
  return (
    <div className={style.priceBlock}>
      <p className={style.unitPrice}>${price.toFixed(2)} each</p>
      <p className={style.price}>${(price * quantity).toFixed(2)}</p>
    </div>
  );
}
