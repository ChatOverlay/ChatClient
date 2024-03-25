import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useParams } from "react-router-dom";
const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요

export default function Chat() {
  const [message, setMessage] = useState(""); //메시지
  const messagesEndRef = useRef(null);
  const [closeOption, setCloseOption] = useState(false);

  const { QuestionId } = useParams(); // Extract roomId from URL

  return (
    <>
    <AppContainer show={closeOption}>
      <TopBar>
        <IconContainer onClick={() => setCloseOption(!closeOption)}>
          {closeOption ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <KeyboardDoubleArrowLeftIcon />
          )}
        </IconContainer>
        <RoomNumberContainer>{roomId}</RoomNumberContainer>
      </TopBar>
      <ChatContainer>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} user={msg.user}>
              {msg.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <StyledInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지를 입력하세요..."
          />
          <StyledButton onClick={sendMessage}>
            <SendIcon />
          </StyledButton>
        </InputContainer>
      </ChatContainer>
    </AppContainer>
    </>
  );
}

//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: #202c39;
  border-left: 1px solid #f2d492;
  flex-direction: column;

  transition: all 0.3s;
  z-index: 1;
`;