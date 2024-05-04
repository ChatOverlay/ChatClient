import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SmsIcon from "@mui/icons-material/Sms";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import ChatList from "../navbarlist/ChatListBox";
import QuestionList from "../navbarlist/QuestionList";
import MyPage from "../navbarlist/MyPage";
import Setting from "../setting/Setting";
import { useTheme } from "../../context/ThemeContext";

export default function VerticalAppBar() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const { theme } = useTheme();

  const sectionComponents = {
    0: <ChatList />,
    1: <QuestionList />,
    2: <MyPage />,
  };

  const renderSectionComponent = (section) =>
    sectionComponents[section] || null;

  const handleChatList = () => {
    navigate("/chatlist");
    setSection(0);
    setActiveIcon(0);
  };

  const handleOption = () => {
    setIsModalOpen(!isModalOpen);
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
      <AppBar>
        <FirstIconWrapper>
          <IconContainer onClick={handleChatList} active={activeIcon === 0}>
            <SmsIcon sx={IconSx} />
            <span>채팅</span>
          </IconContainer>
          <IconContainer
            onClick={() => {
              setSection(1);
              setActiveIcon(1);
            }}
            active={activeIcon === 1}
          >
            <FilterFramesIcon sx={IconSx} />
            <span>질문 게시판</span>
          </IconContainer>
          <IconContainer
            onClick={() => {
              setSection(2);
              setActiveIcon(2);
            }}
            active={activeIcon === 2}
          >
            <AccountCircleIcon sx={IconSx} />
            <span>MY</span>
          </IconContainer>
        </FirstIconWrapper>
        <SecondIconWrapper>
          <IconContainer onClick={() => handleOption()}>
            <SettingsIcon sx={IconSx} />
            <span>설정</span>
          </IconContainer>
          <IconContainer onClick={handleLogout}>
            <LogoutIcon sx={IconSx} />
            <span>로그아웃</span>
          </IconContainer>
        </SecondIconWrapper>
      </AppBar>
      {renderSectionComponent(section)}
      {isModalOpen && <Setting handleOption={handleOption} />}
    </>
  );
}

const AppBar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  background-color: var(--foreground-color);
  color: var(--background-color);
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 5rem;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
    height: 5rem;
    top: auto;
    bottom: 0;
    justify-content: space-between;
  }
`;

const FirstIconWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    width: 80%;
    height: 100%;
    justify-content: space-between;
  }
`;

const SecondIconWrapper = styled.div`
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;
const IconContainer = styled.div`
  margin-top: 5vh;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.active ? "1" : "0.8")};

  &:hover {
    opacity: 1;
    span {
      visibility: visible;
      opacity: 1;
    }
  }

  span {
    visibility: ${(props) => (props.active ? "visible" : "hidden")};
    opacity: ${(props) => (props.active ? "1" : "0")};
    transition: visibility 0s, opacity 0.1s linear;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: row;
    span {
      display: none; // Optionally hide text labels on mobile
    }
  }
`;

const IconSx = {
  fontSize: "2.5rem",
  marginBottom: "0.3rem",
};
