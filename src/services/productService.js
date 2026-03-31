const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
      headers: getHeaders(),
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
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update product");
  }

  return await response.json();
}

export async function addProductAttribute(productId, attributeData) {
  const response = await fetch(`${API_URL}/products/${productId}/attributes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(attributeData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to add attribute");
  }
  return await response.json();
}

export async function removeProductAttribute(productId, attributeId) {
  const response = await fetch(
    `${API_URL}/products/${productId}/attributes/${attributeId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to remove attribute");
  }
  return await response.json();
}
