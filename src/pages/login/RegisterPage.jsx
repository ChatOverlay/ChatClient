import React from "react";
import styled from "styled-components";
import Register from "../../components/login/Register";
import { useTheme } from "../../context/ThemeContext";
import useIsAuth from "../../hooks/useIsAuth";

export default function RegisterPage() {
  const {theme} = useTheme();
  useIsAuth();
  return (
    <HomeContainer theme={theme}>
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
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  font-family: "Roboto";
  position: relative;
  z-index: 100;
`;
