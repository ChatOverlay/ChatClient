import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return false;
      }
      return isTokenValid(token);
    };

    const isTokenValid = (token) => {
      // 예를 들어 토큰의 만료 시간을 검사하는 간단한 로직
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expires = payload.exp * 1000;
      if (Date.now() >= expires) {
        localStorage.removeItem('token'); // 만료된 토큰 제거
        return false;
      }
      return true;
    };

    if (!isAuthenticated()) {
      navigate("/login", { replace: true, state: "잘못된 접근입니다." });
    }
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
