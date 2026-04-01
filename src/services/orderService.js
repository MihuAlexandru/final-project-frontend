import { apiFetch } from "./apiClient.js";

export async function getOrderHistory(page = 1, limit = 10) {
  return apiFetch(`/orders/me?page=${page}&limit=${limit}`);
}

export async function getOrderById(orderId) {
  return apiFetch(`/orders/me/${orderId}`);
}

export async function cancelOrder(orderId) {
  return apiFetch(`/orders/me/${orderId}/cancel`, {
    method: "PATCH",
  });
}