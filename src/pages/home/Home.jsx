import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function Home() {
  const navigate = useNavigate();
  const HandleButton = () => {
    navigate("/Login");
  };

  return (
    <HomeContainer>
      <Header>모두의 소리함</Header>
      <Button onClick={HandleButton}>수업 채팅 시작하기</Button>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #202c39;
  color: #f2d492;
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
  background-color: #f2d492;
  color: #202c39;
  border-radius: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  
  align-items: center;
  font-size: 1.5rem;
  margin-top: 20px;
  transition: 0.2s;
  &:hover {
    background-color: #f2d492;
    color: #202c39;
    transform: scale(1.1);
  }
`;
