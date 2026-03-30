import style from "./CartHeader.module.css";

export default function CartHeader({ itemCountLabel }) {
  return (
    <div className={style.titleRow}>
      <h1 className={style.title}>Shopping cart</h1>
      <span className={style.itemCount}>({itemCountLabel})</span>
    </div>
  );
}
