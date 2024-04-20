import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import BackgroundImage from "../../assets/backgroundImg/Gachon_Muhan.jpg";

export default function ChatList() {
  const {theme} = useTheme();
  return (
      <AppContainer theme={theme}>수업을 클릭하여 참가해보세요.</AppContainer>
  );
}
//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: 25vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  flex-direction: column;
  justify-content: center;
  opacity : 0.8;
  align-items: center;
  color: ${({ theme }) => theme.foreground};
  font-size: 2.5rem;
  font-weight: bold;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${BackgroundImage}); // Set the background image
    background-size: cover; // Cover the entire container
    background-repeat: no-repeat; // Prevent repeating the background image
    background-position: center; // Center the background image
    opacity: 0.8; // Set the opacity for the background image only
    z-index: -1; // Ensure the pseudo-element is behind the content
  }
`;