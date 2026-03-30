const API_URL = import.meta.env.VITE_API_URL;

export async function getMyProfile() {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }

  return await response.json();
}
