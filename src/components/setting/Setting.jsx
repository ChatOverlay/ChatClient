import React, { useState} from "react";
import styled, { keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../context/ThemeContext";

export default function Setting({ handleOption }) {
  const [isClosing, setIsClosing] = useState(false);
  const { theme, setThemeName } = useTheme();


  console.log(theme);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => handleOption(false), 500);
  };

  const handleThemeChange = (themeValue) => {
    setThemeName(themeValue);
  };

  const themeOptions = [
    { value: "default", label: "Gachon Theme", description: "Classic blue and white setup" },
    { value: "light", label: "Light Theme", description: "Bright and clear appearance" },
    { value: "dark", label: "Dark Theme", description: "Dark tones for night mode" }
  ];

  return (
    <SettingContainer isClosing={isClosing}>
      <SettingBox>
        <SettingTitleContainer>
          <Title>Settings</Title>
          <IconContainer onClick={handleClose}>
            <CloseIcon />
          </IconContainer>
        </SettingTitleContainer>
        <ThemeList>
          {themeOptions.map(themes => (
            <ThemeOption
              key={themes.value}
              isSelected={theme.name === themes.value}
              onClick={() => handleThemeChange(themes.value)}
            >
              <ThemeLabel isSelected={theme.name === themes.value}>{themes.label}</ThemeLabel>
              <ThemeDescription>{theme.description}</ThemeDescription>
            </ThemeOption>
          ))}
        </ThemeList>
      </SettingBox>
    </SettingContainer>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const SettingContainer = styled.div`
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.5s ease-out forwards;
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
  border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const IconContainer = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  &:hover { opacity: 0.6; }
`;

const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ThemeOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? "#e1e1e1" : "transparent"};
  border-radius: 0.25rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ThemeLabel = styled.div`
  font-weight: ${({ isSelected }) => isSelected ? "bold" : "normal"};
`;

const ThemeDescription = styled.div`
  font-size: 0.875rem;
  color: #666;
`;