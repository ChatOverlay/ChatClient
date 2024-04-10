import React from "react";
import styled from "styled-components";

export default function ChatList() {
  return (
      <AppContainer>수업을 클릭하여 참가해보세요.</AppContainer>
  );
}
//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: 25vw;
  height: 100vh;
  background-color: #202c39;
  flex-direction: column;
  justify-content: center;
  opacity : 0.8;
  align-items: center;
  color: #f2d492;
  font-size: 3rem;
  font-weight: bold;
`;
