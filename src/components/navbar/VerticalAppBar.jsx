import React, { useState } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ChatList from "../navbarlist/ChatListBox";
import QuestionList from "../navbarlist/QuestionList";
import MyPage from "../navbarlist/MyPage";
import Setting from "../setting/Setting";

export default function VerticalAppBar() {
  const navigate = useNavigate(); //라우터 네비게이션
  const [section, setSection] = useState(0); //해당 섹션 설정
  const [isModalOpen, setIsModalOpen] = useState(false); //세팅열기

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

  const handleOption = () => {
    setIsModalOpen(!isModalOpen); // 모달 열기
  };

  return (
    <>
      <AppBar>
        <div>
          <IconContainer onClick={() => handleChatList()}>
            <ChatIcon sx={{ fontSize: "2rem" }} />
          </IconContainer>
          <IconContainer onClick={() => setSection(1)}>
            <FilterFramesIcon sx={{ fontSize: "2rem" }} />
          </IconContainer>{" "}
          <IconContainer onClick={() => setSection(2)}>
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />
          </IconContainer>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <IconContainer onClick={() => handleOption()}>
            <SettingsIcon sx={{ fontSize: "2rem" }} />
          </IconContainer>
        </div>
      </AppBar>
      {renderSectionComponent(section)}
      {isModalOpen && <Setting handleOption={handleOption} />}
    </>
  );
}

//총 앱 사이즈
const AppBar = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: #f2d492;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 5vw;
  border-right: 1px solid #202c39;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Example shadow */
`;

//아이콘 컨테이너
const IconContainer = styled.div`
  margin-top: 3rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #202c39;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    margin-top: 1rem;
  }
`;
