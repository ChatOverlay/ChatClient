import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export default function Setting({ handleOption }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // 먼저 애니메이션 시작
    setTimeout(handleOption, 500); // 애니메이션 지속시간 후 모달 닫기
  };

  return (
    <SettingContainer isClosing={isClosing}>
      <SettingBox>
        <SettingTitleContainer>
          <Title>설정</Title>
          <IconContainer onClick={handleClose}>
            <CloseIcon />
          </IconContainer>
        </SettingTitleContainer>
      </SettingBox>
    </SettingContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

//세팅 컨테이너 (위치 조정)
const SettingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; animation: ${({ isClosing }) =>
    isClosing ? fadeOut : fadeIn} 0.3s ease-out forwards;
`;

//세팅 박스
const SettingBox = styled.div`
  width: 30vw;
  height: 30vh;
  max-width: 50vw;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

//세팅 헤더 부분
const SettingTitleContainer = styled.div`
  display: flex;
  width: 30vw;
  border-bottom: 1px solid ${({ theme }) => theme.foreground};
  justify-content: space-between;
  color: ${({ theme }) => theme.foreground};
`;

//세팅 헤더 제목
const Title = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
`;

//X 아이콘 설정
const IconContainer = styled.div`
  padding: 10px 10px 0 0;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;
