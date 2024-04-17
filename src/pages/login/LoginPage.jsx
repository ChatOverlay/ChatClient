import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import useIsAuth from "../../hooks/useIsAuth";
import BackgroundImage from "../../assets/backgroundImg/Gachon_Muhan.jpg";
import LogoImg from "../../assets/backgroundImg/clasome.png";
export default function LoginPage() {
  useIsAuth();
  return (
    <HomeContainer>
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
  background: url(${BackgroundImage}) no-repeat center center;
  background-size: cover; // Ensure the background covers the entire container
`;

const Logo = styled.img`
  margin-bottom : 3rem;
  width : 30rem;
`;