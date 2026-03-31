const API_URL = import.meta.env.VITE_API_URL;

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
