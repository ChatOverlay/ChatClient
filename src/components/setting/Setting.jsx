import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../context/ThemeContext";

export default function Setting({ handleOption }) {
  const [isClosing, setIsClosing] = useState(false);
  const { setThemeName } = useTheme(); // Use the setThemeName function

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(handleOption, 500);
  };

  const handleThemeChange = (event) => {
    setThemeName(event.target.value);
  };

  return (
    <SettingContainer isClosing={isClosing}>
      <SettingBox>
        <SettingTitleContainer>
          <Title>Settings</Title>
          <IconContainer onClick={handleClose}>
            <CloseIcon />
          </IconContainer>
        </SettingTitleContainer>
        <ThemeSelector onChange={handleThemeChange}>
          <option value="light">Light Theme</option>
          <option value="dark">Dark Theme</option>
          <option value="gachon">Gachon Theme</option>
        </ThemeSelector>
      </SettingBox>
    </SettingContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const SettingContainer = styled.div`
  animation: ${({ isClosing }) => isClosing ? fadeOut : fadeIn} 0.5s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const SettingBox = styled.div`
  width: 30rem;  
  height: auto; // Auto height based on content
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
  padding: 1.25rem; 
  display: flex;
  flex-direction: column;
`;

const SettingTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid #e1e1e1; // Lighter border for subtlety
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const IconContainer = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

const ThemeSelector = styled.select`
  margin-top: 1.25rem;
  padding: 0.625rem;
  width: 100%;
  font-size: 1rem;
  border: 1px solid #e1e1e1; // Subtle border for input
  border-radius: 0.25rem;
  cursor: pointer;
  &:focus {
    border-color: #a8a8a8;
  }
`;
