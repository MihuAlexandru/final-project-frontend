const API_URL = import.meta.env.VITE_API_URL;

export async function updateMyAddress(addressData) {
  const token = localStorage.getItem("access_token");

  const fullStreet = addressData.house_number
    ? `${addressData.street}, ${addressData.house_number}`
    : addressData.street;

  const formattedData = {
    street: fullStreet,
    city: addressData.city,
    state: addressData.state,
    postal_code: addressData.postal_code,
    country: addressData.country,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(`${API_URL}/users/me/address`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(formattedData),
  });

  if (response.status === 404) {
    console.log("Address does not exist (404). Calling POST to create...");

    response = await fetch(`${API_URL}/users/me/address`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formattedData),
    });
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }

  return await response.json();
}
