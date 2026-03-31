const BASE_URL = import.meta.env.VITE_API_URL;

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getAuthHeaders() {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return {};
  }

  const tokenType = localStorage.getItem("token_type") ?? "Bearer";
  const normalizedTokenType =
    tokenType.charAt(0).toUpperCase() + tokenType.slice(1);

  return {
    Authorization: `${normalizedTokenType} ${accessToken}`,
  };
}

function getErrorMessage(data, fallbackMessage) {
  if (typeof data?.detail === "string") {
    return data.detail;
  }

  return fallbackMessage;
}

async function requestCart(path = "/cart/", options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Cart request failed."));
  }

  return data;
}

function resolveImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  return new URL(imagePath, BASE_URL).toString();
}

function formatVariant(attributes = []) {
  if (!Array.isArray(attributes) || attributes.length === 0) {
    return "";
  }

  return attributes
    .map((attribute) => `${attribute.name}: ${attribute.value}`)
    .join(" · ");
}

function mapCartItem(item) {
  const { product, quantity, price_each: priceEach } = item;

  return {
    id: product.id,
    name: product.name,
    variant: formatVariant(product.attributes),
    price: Number(priceEach ?? product.price),
    quantity,
    image: resolveImageUrl(product.images?.[0]?.image_path),
    stock: product.stock_quantity,
  };
}

export async function getCart() {
  if (!getAccessToken()) {
    return { items: [], total: 0 };
  }

  const data = await requestCart();

  return {
    items: data.items.map(mapCartItem),
    total: data.total,
  };
}

export async function addToCart(productId, quantity = 1) {
  const data = await requestCart("/cart/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });

  return data;
}

export async function updateCartItem(productId, quantity) {
  await requestCart(`/cart/${productId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

  return getCart();
}

export async function removeCartItem(productId) {
  await requestCart(`/cart/${productId}`, {
    method: "DELETE",
  });

  return getCart();
}

export async function checkCartStock(items) {
  const latestCart = await getCart();

  if (latestCart.items.length === 0) {
    return items.map((item) => ({
      id: item.id,
      stock: item.stock ?? 0,
      stockExceeded: item.quantity > (item.stock ?? 0),
    }));
  }

  return latestCart.items.map((item) => ({
    id: item.id,
    stock: item.stock,
    stockExceeded: item.quantity > item.stock,
  }));
}
