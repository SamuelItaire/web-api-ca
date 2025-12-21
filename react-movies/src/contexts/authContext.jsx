import { createContext, useState } from "react";
import { login } from "../api/auth-api";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setUserName(username);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        token,
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
