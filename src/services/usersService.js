import { apiFetch } from "./apiClient.js";

export async function getUsers({ page, limit, search } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) params.set("search", search);
  return apiFetch(`/users/?${params}`);
}

export const deactivateUser = (id) =>
  apiFetch(`/users/${id}`, { method: "DELETE" });

export const reactivateUser = (id) =>
  apiFetch(`/users/${id}/activate`, { method: "PATCH" });

export const promoteUser = (id) =>
  apiFetch(`/users/${id}/promote`, { method: "PATCH" });

export const demoteUser = (id) =>
  apiFetch(`/users/${id}/demote`, { method: "PATCH" });
