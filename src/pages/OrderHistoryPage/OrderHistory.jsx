import style from "./OrderHistory.module.css";

export default function OrderHistory() {
  return (
    <main className={style.page}>
      <h1 className={style.heading}>Order History</h1>
      <div className={style.content}>
        <p>Your order history will be displayed here.</p>
      </div>
    </main>
  );
}