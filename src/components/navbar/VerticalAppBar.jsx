import React, { useState } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ChatList from "../navbarlist/ChatListBox";
import QuestionList from "../navbarlist/QuestionList";
import MyPage from "../navbarlist/MyPage";
import Setting from "../setting/Setting";
import { useTheme } from "../../context/ThemeContext";

export default function VerticalAppBar() {
  const navigate = useNavigate(); //라우터 네비게이션
  const [section, setSection] = useState(0); //해당 섹션 설정
  const [isModalOpen, setIsModalOpen] = useState(false); //세팅열기
  const [activeIcon, setActiveIcon] = useState(null); 
  const { theme } = useTheme(); // 현재 테마

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
    setActiveIcon(0);
  };

  const handleOption = () => {
    setIsModalOpen(!isModalOpen); // 모달 열기
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      alert("성공적으로 로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <>
      <AppBar theme={theme}>
        <div>
        <IconContainer onClick={handleChatList} active={activeIcon === 0}>
        <ChatIcon sx={{ fontSize: "2rem" }} />
        <span>채팅</span>
      </IconContainer>
      <IconContainer onClick={() => {setSection(1); setActiveIcon(1);}} active={activeIcon === 1}>
        <FilterFramesIcon sx={{ fontSize: "2rem" }} />
        <span>질문 게시판</span>
      </IconContainer>
      <IconContainer onClick={() => {setSection(2); setActiveIcon(2);}} active={activeIcon === 2}>
        <AccountCircleIcon sx={{ fontSize: "2rem" }} />
        <span>MY</span>
      </IconContainer>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <IconContainer onClick={() => handleOption()}>
            <SettingsIcon sx={{ fontSize: "2rem" }} />
            <span>설정</span>
          </IconContainer>
          <IconContainer onClick={handleLogout}>
            <LogoutIcon sx={{ fontSize: "2rem" }} />
            <span>로그아웃</span>
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
  background-color: ${(props) => props.theme.foreground};
  color: ${(props) => props.theme.background};
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 5vw;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Example shadow */
`;

const IconContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.active ? '1' : '0.8')}; /* Change opacity based on active state */

  &:hover {
    opacity: 1;

    span {
      visibility: visible;
      opacity: 1;
    }
  }

  &:first-child {
    margin-top: 1rem;
  }

  span {
    visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.active ? '1' : '0')};
    transition: visibility 0s, opacity 0.1s linear;
    font-size: 0.8rem;
  }
`;