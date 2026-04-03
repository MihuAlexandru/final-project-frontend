import { useState, useEffect } from "react";
import { getOrderHistory, getOrderById, cancelOrder } from "../../services/orderService.js";
import EmptyOrderHistoryState from "./components/EmptyOrderHistoryState.jsx";
import OrderCard from "./components/OrderCard.jsx";
import OrderDetailsModal from "./components/OrderDetailsModal.jsx";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import style from "./OrderHistory.module.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getOrderHistory(page, limit);
        setOrders(data.items);
        setTotalItems(data.total_items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
    setDetailsLoading(true);
    try {
      const details = await getOrderById(order.id);
      setOrderDetails(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedOrder) return;
    try {
      await cancelOrder(selectedOrder.id);
      // Refresh orders
      const data = await getOrderHistory(page, limit);
      setOrders(data.items);
      setTotalItems(data.total_items);
      setShowCancelModal(false);
      setSelectedOrder(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.ceil(totalItems / limit);

  if (loading) return <div className={style.orderHistoryPage}><p>Loading...</p></div>;
  if (error) return <div className={style.orderHistoryPage}><p>Error: {error}</p></div>;

  return (
    <main className={style.orderHistoryPage}>
      <h1 className={style.pageTitle}>Order History</h1>
      {orders.length === 0 ? (
        <EmptyOrderHistoryState />
      ) : (
        <div className={style.content}>
          <div className={style.ordersList}>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelOrder}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className={style.pagination}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      <ConfirmDeleteModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        itemName="order"
      />
      <OrderDetailsModal
        open={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setOrderDetails(null);
          setSelectedOrder(null);
        }}
        order={orderDetails}
        loading={detailsLoading}
      />
    </main>
  );
}