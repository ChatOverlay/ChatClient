import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import BackgroundImage from "../../assets/backgroundImg/Gachon_Muhan.jpg";
import { useLocation } from "react-router-dom"; // Import useLocation hook

export default function ChatList() {
  const { theme } = useTheme();
  const location = useLocation(); // Get location object
  const message = location.state?.message || '수업을 클릭하여 참가해보세요.'; // Default message or state-passed message

  return (
    <AppContainer theme={theme}>{message}</AppContainer>
  );
}

// Define the animation using keyframes
const slideInFromLeft = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
`;

// AppContainer with animation
const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: 25vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  flex-direction: column;
  justify-content: center;
  opacity: 1;
  align-items: center;
  color: ${({ theme }) => theme.foreground};
  font-size: 2.5rem;
  font-weight: bold;
  animation: ${slideInFromLeft} 0.5s ease-out forwards;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${BackgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.5;
    z-index: -1;
  }
`;
