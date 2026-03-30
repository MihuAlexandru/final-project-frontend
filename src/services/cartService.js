import { MOCK_STOCK_BY_PRODUCT_ID } from "../../MockData/cartItems";

function fetchProductStock(productId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = MOCK_STOCK_BY_PRODUCT_ID[productId] ?? 0;
      resolve(stock);
    }, 150);
  });
}

export async function checkCartStock(items) {
  const results = await Promise.all(
    items.map(async (item) => {
      const stock = await fetchProductStock(item.id);
      return { id: item.id, stock, stockExceeded: item.quantity > stock };
    }),
  );
  return results;
}
