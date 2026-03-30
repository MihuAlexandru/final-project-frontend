const API_URL = import.meta.env.VITE_API_URL;

export async function getProductById(id) {
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Product not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function updateProduct(productId, updateData) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (response.status === 401) {
      console.error("Session expired. Please log in again.");
    }

    throw new Error(errorData.detail || "Failed to update product");
  }

  return await response.json();
}
