import { apiFetch } from "./apiClient.js";

export const fetchCurrentUser = () => apiFetch("/users/me");
