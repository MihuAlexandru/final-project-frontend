import style from "./OrderCard.module.css";

export default function OrderCard({ order, onViewDetails, onCancel }) {
  const canCancel = (status) => ["pending"].includes(status);

  return (
    <div className={style.orderCard}>
      <div className={style.orderHeader}>
        <span>Order #{order.id}</span>
        <span className={style.status} data-status={order.status}>{order.status}</span>
      </div>
      <div className={style.orderDetails}>
        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
        <p>Payment: {order.payment_type}</p>
        <p>Total: ${order.total_amount.toFixed(2)}</p>
        <p>Items: {order.item_count}</p>
      </div>
      <div className={style.orderActions}>
        <button onClick={() => onViewDetails(order)}>View Details</button>
        {canCancel(order.status) && (
          <button onClick={() => onCancel(order)}>Cancel Order</button>
        )}
      </div>
    </div>
  );
}