const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProductsPaginated(
  page = 1,
  limit = 12,
  search = "",
  categoryId = null,
  minPrice = null,
  maxPrice = null,
) {
  try {
    let url = `${API_URL}/products/?page=${page}&limit=${limit}`;

    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    if (minPrice !== null) url += `&min_price=${minPrice}`;
    if (maxPrice !== null) url += `&max_price=${maxPrice}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
}

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

export async function createProduct(productData) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return await response.json();
}

export async function uploadProductImage(productId, file) {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/products/${productId}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return await response.json();
}

export async function addProductAtttribute(productId, attributeData) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${API_URL}/products/${productId}/attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attributeData),
  });

  if (!response.ok) throw new Error("Failed to add attribute");
  return await response.json();
}
