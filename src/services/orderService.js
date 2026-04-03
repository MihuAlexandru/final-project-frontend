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
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function placeOrder(orderData) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
}
