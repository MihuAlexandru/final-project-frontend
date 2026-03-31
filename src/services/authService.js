const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Login failed. Please try again.");
  }

  return data;
}


export async function requestPasswordReset(email) {
  const response = await fetch(`${BASE_URL}/auth/reset-password-request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail ?? "Failed to request password reset.");
  }

  return data;
}

export async function resetPassword(token, new_password) {
  const response = await fetch(`${BASE_URL}/auth/reset-password`, { 
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail ?? "Failed to reset password.");
  }

  return data;
}