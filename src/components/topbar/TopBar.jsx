import React from 'react';
import styled from 'styled-components';
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useTheme } from '../../context/ThemeContext';

// 스타일 컴포넌트 정의
const TopBarContainer = styled.div`
  border-bottom: 1px solid var(--foreground-color);
  display: flex;
  font-size: 2rem;
  background-color: var(--foreground-color);
  margin-bottom: 4.9vh;
  font-weight: bold;
  color: var(--background-color);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.2vh 0 0 1rem;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 3rem;
  &:hover {
    opacity: 0.6;
  }
`;

const NumberContainer = styled.div`
  padding-left: 0.5vw;
`;

// 컴포넌트 구현
export default function TopBar({closeOption, setCloseOption, titleName}) {
  const { theme } = useTheme(); // 테마 컨텍스트에서 현재 테마 가져오기
  return (
    <TopBarContainer >
      <IconContainer onClick={() => setCloseOption(!closeOption)}>
        {closeOption ? <KeyboardDoubleArrowRightIcon /> : <KeyboardDoubleArrowLeftIcon />}
      </IconContainer>
      <NumberContainer>{titleName}</NumberContainer>
    </TopBarContainer>
  );
}
