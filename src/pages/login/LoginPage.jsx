import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import useIsAuth from "../../hooks/useIsAuth";
import { useTheme } from "../../context/ThemeContext";
import BackgroundImg from "../../assets/backgroundImg/sky.png"
export default function LoginPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer >
      <Login />
    </HomeContainer>
  );
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-height : 100vh;
  position: relative;
  z-index: 10000;
  background: url(${BackgroundImg}) no-repeat center center fixed; // Use the background image
  background-size: cover; // Ensure the background covers the entire container
`;

