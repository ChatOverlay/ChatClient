import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import useIsAuth from "../../hooks/useIsAuth";
import LogoImg from "../../assets/backgroundImg/clasome.png";
import { useTheme } from "../../context/ThemeContext";
export default function LoginPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer theme={theme}>
      <Logo src={LogoImg} alt="Clasome Logo" />
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
  font-family: "Roboto";
  position: relative;
  z-index: 100;
  background-color: ${({theme})=>theme.background};
`;

const Logo = styled.img`
  margin-bottom : 3rem;
  width : 30rem;
`;