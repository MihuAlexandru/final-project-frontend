const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMyAddresses() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/users/me/addresses/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch addresses");
  }

  return await response.json();
}

export async function updateMyAddress(addressData) {
  const token = localStorage.getItem("access_token");

  const payload = {
    street: addressData.street,
    city: addressData.city,
    state: addressData.state,
    postal_code: addressData.postal_code,
    country: addressData.country,
  };

  const response = await fetch(`${API_URL}/users/me/addresses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to save address");
  }

  return await response.json();
}

export async function editAnAddress(addressId, addressData) {
  const token = localStorage.getItem("access_token");

  const payload = {
    street: addressData.street,
    city: addressData.city,
    state: addressData.state,
    postal_code: addressData.postal_code,
    country: addressData.country,
  };

  const response = await fetch(`${API_URL}/users/me/addresses/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to edit address");
  }

  return await response.json();
}

export async function deleteMyAddress(addressId) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/users/me/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete address");
  }

  return await response.json();
}
