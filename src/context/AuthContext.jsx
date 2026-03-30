import { createContext, useState, useContext } from "react";

//token, type

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || null,
  );

  const login = (newToken, callback) => {
    setToken(newToken);
    localStorage.setItem("access_token", newToken);
    if (callback) callback();
  };

  const logout = (callback) => {
    setToken(null);
    localStorage.removeItem("access_token");
    if (callback) callback();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
