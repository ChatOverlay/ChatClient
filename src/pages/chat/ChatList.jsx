import React from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

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
  font-size: 3rem;
  font-weight: bold;
`;
