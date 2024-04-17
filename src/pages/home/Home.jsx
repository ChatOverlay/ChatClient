import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import useIsAuth from "../../hooks/useIsAuth";

export default function Home() {
  const {theme} = useTheme();
  const navigate = useNavigate();
  useIsAuth();
  return (
    <HomeContainer theme={theme}>
      <Header>모두의 소리함</Header>
      <Button onClick={()=>navigate("/Login")} theme={theme}>수업 채팅 시작하기</Button>
      <RegisterButton onClick={()=>navigate("./register")}>아이디가 없으신가요?</RegisterButton>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  position: relative;
  z-index: 100;
  
`;

const Header = styled.div`
  font-size: 10rem;
  font-weight: bold;
`;

const Button = styled.div`
  width: 15rem;
  height: 50px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  
  align-items: center;
  font-size: 1.5rem;
  margin-top: 20px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;

const RegisterButton = styled.div`
  margin-top : 0.5rem;
  cursor: pointer;
  opacity : 0.8;
  transition: all 0.2s;
  &:hover {
    opacity : 0.6;
  }

`