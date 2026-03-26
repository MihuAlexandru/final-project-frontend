import { apiFetch } from "./apiClient.js";

export async function getUsers({ page, limit, search } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) params.set("search", search);
  return apiFetch(`/users/?${params}`);
}
