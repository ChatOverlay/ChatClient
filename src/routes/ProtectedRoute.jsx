import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async (token) => {
      try {
        console.log("Verifying token:", token);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/verifyToken`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          return false;
        }

        const result = await response.json();
        return result.success;
      } catch (error) {
        console.error("Token verification failed:", error);
        return false;
      }
    };

    const isAuthenticated = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error('No token found in localStorage');
        return false;
      }
      return await verifyToken(token);
    };

    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      
      if (!authenticated) {
        localStorage.removeItem('token');
        navigate("/");
      }
   };

    checkAuthentication();
  }, [navigate]);
  return <Outlet />;
};



export default ProtectedRoute;
