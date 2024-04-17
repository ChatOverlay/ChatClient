import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import { useTheme } from "../../context/ThemeContext";
import useIsAuth from "../../hooks/useIsAuth";
import BackgroundImage from "../../assets/backgroundImg/Gachon_Muhan.jpg";

export default function LoginPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer>
      <Login theme={theme}/>
    </HomeContainer>
  );
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Roboto";
  position: relative;
  z-index: 100;
  background: url(${BackgroundImage}) no-repeat center center;
  background-size: cover; // Ensure the background covers the entire container
`;
