import { apiFetch } from "./apiClient.js";

export const fetchCurrentUser = () => apiFetch("/users/me");

export const updateCurrentUser = (data) =>
  apiFetch("/users/me", { method: "PATCH", body: JSON.stringify(data) });

export const upsertAddress = (data) =>
  apiFetch("/users/me/address", { method: "PUT", body: JSON.stringify(data) });

export const deactivateCurrentUser = () =>
  apiFetch("/users/me", { method: "DELETE" });
