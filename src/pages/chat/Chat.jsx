import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar/TopBar";
const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요

export default function Chat() {
  const [message, setMessage] = useState(""); //메시지
  const [messages, setMessages] = useState([]); //메시지 배열
  const messagesEndRef = useRef(null);
  const [closeOption, setCloseOption] = useState(false);
  const [mileage, setMileage] = useState(0); // 사용자의 마일리지 상태

  const { titleName } = useParams(); // Extract roomId from URL
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message) {
      const token = localStorage.getItem("token");
      const messageObject = {
        text: message,
        token: token,
      };
      socket.emit("message", messageObject, titleName);
      setMessage("");
      scrollToBottom();
      socket.emit("updateMileage", { token });
    }
  };

  useEffect(() => {
    setMessages([]);
    socket.emit("joinRoom", titleName);

    socket.on("message", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      scrollToBottom();
      
    });

    // 마일리지 정보 갱신 리스너
    socket.on("mileageUpdated", (data) => {
      setMileage(data.newMileage);
    });

    return () => {
      socket.off("message");
      socket.off("mileageUpdated");
    };
  }, [titleName]);
  
  useEffect(() => {
    scrollToBottom(); // 메시지 목록이 업데이트 될 때마다 스크롤
  }, [messages]); // messages 배열이 변경될 때마다 실행

  // 여기서 초기 마일리지 로드 및 업데이트 로직 구현
  useEffect(() => {
    const token = localStorage.getItem("token");
    // 서버로부터 초기 마일리지 정보를 요청합니다.
    socket.emit("getInitialMileage", { token });

    // 필요한 경우 여기서 초기 마일리지 정보를 받는 리스너도 설정할 수 있습니다.
  }, []);

  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={titleName}
        />
        <ChatContainer>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                {!msg.isCurrentUser && (
                  <MessageContainer user={msg.isCurrentUser ? "me" : ""}>
                    <UserName>{msg.userName}</UserName>
                    <Message user={msg.isCurrentUser ? "me" : ""}>
                      {msg.text}
                    </Message>
                  </MessageContainer>
                )}
                {msg.isCurrentUser && (
                  <MessageContainer user="me">
                    <Message user="me">{msg.text}</Message>
                  </MessageContainer>
                )}
              </React.Fragment>
            ))}

            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <StyledInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="메시지를 입력하세요..."
            />
            <StyledButton onClick={sendMessage}>
              <span style={{ color: "white" }}>{mileage} /100 </span>{" "}
              {/* 마일리지 정보 표시 */}
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
  padding: 0 1rem;
  display: flex;
  flex-direction: column; // 메시지를 아래에서 위로 쌓도록 설정
`;

//입력 컨테이너
const InputContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
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

// 메시지 컨테이너에 이름을 표시하는 부분을 추가합니다.
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.user === "me" ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
`;

// 사용자 이름을 표시하는 스타일 컴포넌트입니다.
const UserName = styled.div`
  margin-bottom: 4px;
  font-size: 0.8rem;
  color: #a8a8a8; // 이름의 색상을 설정합니다.
  text-align: ${(props) => (props.user === "me" ? "right" : "left")};
`;

// Message 스타일 컴포넌트의 스타일을 조금 조정합니다.
const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.user === "me"
      ? "#f2d492"
      : "#fff"}; // 자신의 메시지와 상대방 메시지의 배경색
  color: ${(props) =>
    props.user === "me"
      ? "black"
      : "black"}; // 텍스트 색상을 설정할 수 있습니다.
`;
