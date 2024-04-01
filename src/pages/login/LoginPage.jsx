import React from "react";
import styled from "styled-components";
import Login from "../../components/login/Login";

export default function LoginPage() {
  return (
    <HomeContainer>
      <Login />
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
  font-family: "Roboto";
  position: relative;
  z-index: 100;
`;
