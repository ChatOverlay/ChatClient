import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { IconMessageCircle } from "@tabler/icons-react";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import ChatListBox from "../navbarlist/ChatListBox";
import QuestionList from "../navbarlist/QuestionList";
import MyPage from "../navbarlist/MyPage";
import Setting from "../setting/Setting";
const ChatIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_14_38)">
      <path d="M3 20L4.29899 16.1052C1.97679 12.6727 2.8741 8.24358 6.39736 5.74489C9.92063 3.2472 14.9807 3.45193 18.2332 6.22426C21.4856 8.99758 21.9253 13.4806 19.2614 16.7114C16.5974 19.9421 11.6523 20.9208 7.69635 19.0013L3 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </g>
  </svg>
);
export default function VerticalAppBar() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(0);

  const sectionTitles = {
    0: "채팅",
    1: "질문 게시판",
    2: "MY",
  };

  const sectionComponents = {
    0: <ChatListBox />,
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

  useEffect(() => {
    // Corrected the useEffect to simply initialize the state
    setSection(0);
    setActiveIcon(0);
  }, []);
  
  return (
    <>
      <Footer>
        <FooterTitle>{sectionTitles[section]}</FooterTitle>
        <FooterIconContainer>
          <IconContainer style={{ opacity: 1 }} onClick={() => handleOption()}>
            <SettingsIcon />
          </IconContainer>
          {activeIcon === 2 && (
            <IconContainer onClick={handleLogout} style={{ opacity: 1 }}>
              <LogoutIcon />
            </IconContainer>
          )}
        </FooterIconContainer>
      </Footer>
      <AppBar>
        <FirstIconWrapper>
          <IconContainer onClick={handleChatList} active={activeIcon === 0}>
            <ChatIcon />
            <span>채팅</span>
          </IconContainer>
          <IconContainer
            onClick={() => {
              setSection(1);
              setActiveIcon(1);
            }}
            active={activeIcon === 1}
          >
            <FilterFramesIcon/>
            <span>질문 게시판</span>
          </IconContainer>
          <IconContainer
            onClick={() => {
              setSection(2);
              setActiveIcon(2);
            }}
            active={activeIcon === 2}
          >
            <AccountCircleIcon />
            <span>MY</span>
          </IconContainer>
        </FirstIconWrapper>
        <SecondIconWrapper>
          <IconContainer onClick={() => handleOption()}>
            <SettingsIcon />
            <span>설정</span>
          </IconContainer>
          <IconContainer onClick={handleLogout}>
            <LogoutIcon  />
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
    height: 6%;
    top: auto;
    bottom: 0;
    justify-content: space-between;
    box-shadow: none;
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
  justify-content: center;
  opacity: ${(props) => (props.active ? "1" : "0.6")};
  
  box-shadow: none; 
  -webkit-tap-highlight-color: transparent; 
  &:focus {
    outline: none;
    box-shadow: none; 
  }

  &:hover {
    opacity: 1;
    span {
      visibility: visible;
      opacity: 1;
    }
  }
  svg {
    font-size: 2.5rem; /* 기본 크기 */
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 1.6rem; /* 모바일에서의 크기 */
      margin-bottom: 0;
    }
  }
  span {
    transition: visibility 0s, opacity 0.1s linear;
    font-size: 0.9rem;
    @media (max-width: 768px) {
      font-size: 0.7rem;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    margin-top: 0;
    flex-direction: column;
  }
`;

const Footer = styled.div`
  display: none; // 기본적으로는 숨김
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    height: 6%;
    background-color: var(--background-color);
    color: var(--foreground-color);
    align-items: center;
    position: fixed;
    left: 0;
    z-index: 20;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const FooterIconContainer = styled.div`
  display: flex;
  margin-right: 1rem;
  gap: 1rem;
  transition: all 0.3s;
`;
