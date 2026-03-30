import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCard from "../../components/Cart/CartCard/CartCard";
import CartHeader from "../../components/Cart/CartHeader/CartHeader";
import EmptyCartState from "../../components/Cart/EmptyCartState/EmptyCartState";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import {
  checkCartStock,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../../services/cartService";
import { useToast } from "../../context/ToastContext";
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
  const [items, setItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const itemCount = items.length;
  const { subtotal, shipping, total } = calculateCartTotals(items);
  const itemCountLabel = getItemCountLabel(itemCount);

  useEffect(() => {
    let isMounted = true;

    async function loadCartItems() {
      try {
        const cart = await getCart();

        if (isMounted) {
          setItems(cart.items);
        }
      } catch (error) {
        if (isMounted) {
          setItems([]);
          addToast({
            type: "error",
            message: error.message ?? "Could not load cart.",
          });
        }
      } finally {
        if (isMounted) {
          setLoadingCart(false);
        }
      }
    }

    loadCartItems();

    return () => {
      isMounted = false;
    };
  }, [addToast]);

  const handleRemove = async (id) => {
    try {
      const updatedCart = await removeCartItem(id);
      setItems(updatedCart.items);
      addToast({
        type: "info",
        message: "Item removed from cart.",
      });
    } catch (error) {
      addToast({
        type: "error",
        message: error.message ?? "Could not remove item from cart.",
      });
    }
  };

  const handleQuantityChange = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      const updatedCart = await updateCartItem(id, newQty);
      setItems(updatedCart.items);
    } catch (error) {
      addToast({
        type: "error",
        message: error.message ?? "Could not update cart quantity.",
      });
    }
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

      {!loadingCart && itemCount === 0 ? (
        <EmptyCartState />
      ) : !loadingCart ? (
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
      ) : null}
    </div>
  );
}
