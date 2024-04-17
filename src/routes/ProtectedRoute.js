import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return token;
    };

    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
