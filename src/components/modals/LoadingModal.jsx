import React from "react";
import styled from "styled-components";
import { ModalBackdrop } from "./ImageModal";

export default function LoadingModal() {
  return (
    <ModalBackdrop style={{flexDirection : "column"}}>
      <Loader />
      <LoadingMessage>
        정보를 가져오는 중입니다. 잠시만 기다려주세요..
      </LoadingMessage>
    </ModalBackdrop>
  );
}
const LoadingMessage = styled.span`
  color: white;
  font-size: 16px;
  text-align: center;
  margin-top : 30px;
  
`;

const Loader = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  animation: spin 1s infinite linear;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;