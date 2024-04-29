import React from "react";
import styled from "styled-components";
import useIsAuth from "../../hooks/useIsAuth";
import LogoImg from "../../assets/backgroundImg/clasome.png";
import { useTheme } from "../../context/ThemeContext";
import BackgroundImg from "../../assets/backgroundImg/sky.png"
import Register from "../../components/login/Register";
export default function LoginPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer >
      <Logo src={LogoImg} alt="Clasome Logo" />
      <Register />
    </HomeContainer>
  );
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 100;
  background: url(${BackgroundImg}) no-repeat center center fixed; // Use the background image
  background-size: cover; // Ensure the background covers the entire container
`;

const Logo = styled.img`
  margin-bottom : 3rem;
  width : 30rem;
`;