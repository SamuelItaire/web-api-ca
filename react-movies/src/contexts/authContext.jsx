import { createContext, useState } from "react";
import { login } from "../api/auth-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      localStorage.setItem("token", result.token);
      setIsAuthenticated(true);
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authenticate, signout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
