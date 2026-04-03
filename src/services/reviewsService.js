const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProductReviews(productId) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_URL}/reviews/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching review: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
}

export async function addProductReview(productId, ratingValue) {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(`${API_URL}/reviews/products/${productId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: ratingValue,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending review: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add review to database: ", error);
    throw error;
  }
}
