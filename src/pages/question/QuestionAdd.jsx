import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import styled from "styled-components";

export default function QuestionAdd() {
  
  const [closeOption, setCloseOption] = useState(false);
  return (
    <AppContainer show={closeOption}>
      <TopBar
        closeOption={closeOption}
        setCloseOption={setCloseOption}
        currentTitle={"새로운 질문 만들기"}
      />
    </AppContainer>
  );
}
//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height : 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: #202c39;
  border-left: 1px solid #f2d492;
  transition: all 0.3s;
  z-index: 1;
`;