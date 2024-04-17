import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";
import { useTheme } from "../../context/ThemeContext";
import useIsAuth from "../../hooks/useIsAuth";

export default function LoginPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer theme={theme}>
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
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  font-family: "Roboto";
  position: relative;
  z-index: 100;
`;
