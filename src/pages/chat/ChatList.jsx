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
  border-left: 1px solid #f2d492;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f2d492;
  font-size: 5rem;
  font-weight: bold;
`;
