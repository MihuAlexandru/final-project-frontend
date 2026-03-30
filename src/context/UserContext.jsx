import { createContext, useContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/profileService.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCurrentUser()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
      })
      .finally(() => setLoading(false));
  }, []);

  function login(token, tokenType) {
    localStorage.setItem("access_token", token);
    if (tokenType) localStorage.setItem("token_type", tokenType);
    return fetchCurrentUser().then(setUser);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
