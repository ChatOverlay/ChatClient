// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = token && isTokenValid(token);
    setAuthenticated(isAuthenticated);

    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [navigate, location.pathname]);

  const isTokenValid = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expires = payload.exp * 1000;
    return Date.now() < expires;
  };

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
