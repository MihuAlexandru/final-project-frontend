import { createContext, useContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/profileService.js";
import { getMyAddresses } from "../services/addressService.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userData = await fetchCurrentUser();

      try {
        const activeAddresses = await getMyAddresses();
        userData.addresses = activeAddresses;
      } catch (err) {
        userData.addresses = [];
        console.error("Fetch addresses error:", err);
      }

      setUser(userData);
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      setUser(null);
      console.error("Fetch user data error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    loadUserData();
  }, []);

  function login(token, tokenType) {
    localStorage.setItem("access_token", token);
    if (tokenType) localStorage.setItem("token_type", tokenType);
    return loadUserData();
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
