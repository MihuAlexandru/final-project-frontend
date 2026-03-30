import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../components/Cart/CartCard/CartCard";
import CartHeader from "../../components/Cart/CartHeader/CartHeader";
import EmptyCartState from "../../components/Cart/EmptyCartState/EmptyCartState";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { checkCartStock } from "../../services/cartService";
import { useToast } from "../../context/ToastContext";
import { CART_ITEMS } from "../../../MockData/cartItems";
import style from "./Cart.module.css";

function getItemCountLabel(itemCount) {
  return `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}

function calculateCartTotals(items) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 0;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
}

function mergeStockResults(items, stockResults) {
  return items.map((item) => {
    const result = stockResults.find(
      (stockResult) => stockResult.id === item.id,
    );
    return result ? { ...item, stock: result.stock } : item;
  });
}

export default function Cart() {
  const [items, setItems] = useState(CART_ITEMS);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const itemCount = items.length;
  const { subtotal, shipping, total } = calculateCartTotals(items);
  const itemCountLabel = getItemCountLabel(itemCount);

  useEffect(() => {
    let isMounted = true;

    async function initializeStock() {
      try {
        const stockResults = await checkCartStock(CART_ITEMS);

        if (!isMounted) return;
        setItems((prev) => mergeStockResults(prev, stockResults));
      } catch {
        if (!isMounted) return;
        setItems(CART_ITEMS);
      }
    }

    initializeStock();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const handleOpenProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCheckout = async () => {
    setCheckingOut(true);

    try {
      const stockResults = await checkCartStock(items);

      setItems((prev) => mergeStockResults(prev, stockResults));

      const outOfStock = stockResults.filter((r) => r.stockExceeded);

      if (outOfStock.length > 0) {
        addToast({
          type: "error",
          message: `${outOfStock.length} item(s) exceed available stock. Please adjust quantities before checking out.`,
        });
        return;
      }

      navigate("/checkout");
    } catch {
      addToast({
        type: "error",
        message: "Could not verify stock. Please try again.",
      });
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className={style.page}>
      <CartHeader itemCountLabel={itemCountLabel} />

      {itemCount === 0 ? (
        <EmptyCartState />
      ) : (
        <div className={style.layout}>
          <section className={style.itemList}>
            {items.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
                onOpenProduct={handleOpenProduct}
              />
            ))}
          </section>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onCheckout={handleCheckout}
            checkingOut={checkingOut}
            isDisabled={itemCount === 0}
          />
        </div>
      )}
    </div>
  );
}
