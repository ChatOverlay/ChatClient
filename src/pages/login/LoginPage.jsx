import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import useIsAuth from "../../hooks/useIsAuth";
import BackgroundImg from "../../assets/backgroundImg/sky.png";

export default function LoginPage() {
  useIsAuth();
  return (
    <HomeContainer>
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
  width: 100vw; /* Ensure the container covers the entire viewport width */
  position: fixed; /* Fix the position to prevent scrolling */
  top: 0;
  left: 0;
  z-index: 10000;
  background: url(${BackgroundImg}) no-repeat center center fixed; /* Fix the background image */
  background-size: cover; /* Ensure the background covers the entire container */
  overflow: hidden; /* Prevent scrolling */
`;
