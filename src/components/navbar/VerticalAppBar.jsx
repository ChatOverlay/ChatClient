import React, { useState } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';

import ChatList from "../navbarlist/ChatListBox";
import QuestionList from "../navbarlist/QuestionList";
import MyPage from "../navbarlist/MyPage";

export default function VerticalAppBar() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);
  //렌디렁 조건부
  const sectionComponents = {
    0: <ChatList />,
    1: <QuestionList />,
    2: <MyPage />,
  };
  const renderSectionComponent = (section) =>
    sectionComponents[section] || null;

  //ChatList 클릭할 시
  const handleChatList = () => {
    navigate("/chatlist");
    setSection(0);
  };

  return (
    <>
      <AppBar>
        <IconContainer onClick={() => handleChatList()}>
          <ChatIcon sx={{ color: " #f2d492", fontSize: "3rem" }} />
        </IconContainer>
        <IconContainer onClick={() => setSection(1)}>
          <FilterFramesIcon sx={{ color: " #f2d492", fontSize: "3rem" }} />
        </IconContainer>{" "}
        <IconContainer onClick={() => setSection(2)}>
          <AccountCircleIcon sx={{ color: " #f2d492", fontSize: "3rem" }} />
        </IconContainer>
      </AppBar>
      <SectionAnimationWrapper>
      {renderSectionComponent(section)}
      </SectionAnimationWrapper>
    </>
  );
}

//총 앱 사이즈
const AppBar = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: #202c39;
  align-items: center;
  height: 100vh;
  width: 5vw;
  border-right: 1px solid #f2d492;
`;

//아이콘 컨테이너
const IconContainer = styled.div`
  margin-top: 3rem;
  display: grid;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    margin-top: 1rem;
  }
`;

// 좌측에서 들어오는 슬라이드 애니메이션 정의
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
// 애니메이션을 적용할 컴포넌트 래퍼
const SectionAnimationWrapper = styled.div`
  animation: ${slideInFromLeft} 0.5s ease-out forwards;
`;