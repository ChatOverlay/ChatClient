import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useParams } from "react-router-dom";
const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요
import "../TopBar.css";

export default function Chat() {
  const [message, setMessage] = useState(""); //메시지
  const [messages, setMessages] = useState([]); //메시지 배열
  const messagesEndRef = useRef(null);
  const [closeOption, setCloseOption] = useState(false);

  const { roomId } = useParams(); // Extract roomId from URL
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message) {
      const messageObject = { user: "me", text: message };
      socket.emit("message", messageObject, roomId); // roomId를 인자로 추가
      setMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    setMessages([]); // roomId가 변경될 때마다 메시지 상태를 초기화
    socket.emit("joinRoom", roomId); // 방에 조인

    socket.on("message", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off("message");
    };
  }, [roomId]); // roomId가 변경될 때마다 이 효과를 다시 실행

  useEffect(() => {
    scrollToBottom(); // 메시지 목록이 업데이트 될 때마다 스크롤
  }, [messages]); // messages 배열이 변경될 때마다 실행
  return (
    <>
    <AppContainer show={closeOption}>
      <div className="top__bar">
        <div className="icon_container" onClick={() => setCloseOption(!closeOption)}>
          {closeOption ? (
            <KeyboardDoubleArrowRightIcon />
          ) : (
            <KeyboardDoubleArrowLeftIcon />
          )}
        </div>
        <div className="number__container">{roomId}</div>
      </div>
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
//채팅 컨테이너
const ChatContainer = styled.div`
  height: 90vh;
  padding: 20px;
  display: flex;
  flex-direction: column; // 메시지를 아래에서 위로 쌓도록 설정
`;

//입력 컨테이너
const InputContainer = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 2rem;
  border: 1px solid white;
  justify-content: space-between;
`;

//입력 칸
const StyledInput = styled.input`
  background-color: #202c39;
  border: none;
  padding-left: 10px;
  border-radius: 2rem;
  color: white;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

//제출 버튼
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  color: #202c39;
  background-color: #f2d492;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto; // 여기서 스크롤이 발생하도록 설정
  scrollbar-width: none; // 파이어폭스용 스크롤바 숨김
  -ms-overflow-style: none; // IE, 엣지용 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none; // 웹킷(크롬, 사파리 등) 브라우저용 스크롤바 숨김
  }
  display: flex;
  flex-direction: column; // 메시지를 위에서 아래로 쌓음
  width: 100%;
`;

const Message = styled.div`
  max-width: 60%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 20px;
  color: white;
  ${(props) =>
    props.user === "me"
      ? `
          margin-left: auto;
          background-color: #f2d492; // 자신의 메시지 색
          color: black;
        `
      : `
          margin-right: auto;
          background-color: #007bff; // 상대방의 메시지 색
        `}
`;
