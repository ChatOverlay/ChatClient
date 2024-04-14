import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";
import TopBar from "../../components/topbar/TopBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "../../context/ThemeContext";

const socket = io(`${process.env.REACT_APP_API_URL}`); // 여러분의 서버 주소로 변경하세요

export default function Chat() {
  const [message, setMessage] = useState(""); //메시지
  const [messages, setMessages] = useState([]); //메시지 배열
  const messagesEndRef = useRef(null);
  const [closeOption, setCloseOption] = useState(false);
  const [mileage, setMileage] = useState(0); // 사용자의 마일리지 상태
  const { theme } = useTheme();

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
  const handleReport = async (reportedUserId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reportUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reportedUserId }),
        }
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error reporting user:", error);
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
      <AppContainer show={closeOption} theme={theme}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={titleName}
        />
        <ChatContainer>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <MessageContainer user={msg.isCurrentUser ? "me" : ""}>
                  {!msg.isCurrentUser && <UserName>{msg.userName}</UserName>}
                  <ContentContainer user={msg.isCurrentUser ? "me" : ""}>
                    {msg.profilePictureUrl &&
                      !msg.isCurrentUser && ( // 여기에 조건을 추가
                        <IconContainer onClick={() => handleReport(msg.userId)}>
                          <img
                            src={msg.profilePictureUrl}
                            alt="profile"
                            style={{
                              width: "2rem",
                              height: "2rem",
                              borderRadius: "50%",
                            }}
                          />
                        </IconContainer>
                      )}
                    {!msg.profilePictureUrl &&
                      !msg.isCurrentUser && ( // 여기에 조건을 추가
                        <AccountCircleIcon sx={{ fontSize: "2rem" }} />
                      )}
                    <Message theme={theme} user={msg.isCurrentUser ? "me" : ""}>
                      {msg.text}
                    </Message>
                    <MessageTime theme={theme}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </MessageTime>
                  </ContentContainer>
                </MessageContainer>
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
              theme={theme}
            />
            <StyledButton onClick={sendMessage} theme={theme}>
              <MileageContainer theme={theme}>{mileage} / 100</MileageContainer>
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
  margin-left: ${({ show }) => (show ? "5vw" : "25.1vw")};
  background-color: ${({ theme }) => theme.background};
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
  padding: 0.3rem;
  border-radius: 2rem;
  border: 1px solid white;
  justify-content: space-between;
`;

//입력 칸
const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.background};
  border: none;
  padding-left: 1rem;
  border-radius: 2rem;
  color: white;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

// 제출 버튼 컴포넌트
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem; // 버튼의 패딩을 조정하여 내용이 더 잘 들어맞도록 합니다.
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.foreground};
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

// 마일리지 정보와 전송 아이콘을 포함하는 별도의 컨테이너를 생성합니다.
const MileageContainer = styled.span`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
  white-space: nowrap; // 텍스트가 줄바꿈 되지 않도록 설정
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
  margin-bottom: 1rem;
`;

// 사용자 이름을 표시하는 스타일 컴포넌트입니다.
const UserName = styled.div`
  margin-bottom: 4px;
  font-size: 0.8rem;
  color: #a8a8a8; // 이름의 색상을 설정합니다.
  text-align: ${(props) => (props.user === "me" ? "right" : "left")};
`;
//아이콘 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.background};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

// 메시지 및 시간을 포함하는 ContentContainer에 적용할 스타일을 업데이트합니다.
const ContentContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.user === "me"
      ? "row-reverse"
      : "row"}; // 사용자 본인이 보낸 메시지인 경우 시간을 왼쪽에, 아닌 경우 오른쪽에 위치시킵니다.
  align-items: flex-end; // 메시지와 시간을 같은 선상에 놓습니다.
  justify-content: ${(props) =>
    props.user === "me" ? "flex-end" : "flex-start"};
`;

// MessageTime 스타일 컴포넌트에 margin-left를 추가하여 메시지와 시간 사이 간격을 조정합니다.
const MessageTime = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0.5rem; // 메시지와 시간 사이의 간격을 추가합니다.
`;

// Message 스타일 컴포넌트의 스타일을 조금 조정합니다.
const Message = styled.div`
  padding: 0.5rem;
  border-radius: 20px;
  margin-left: 0.3rem;
  background-color: ${({ theme, user }) => user === "me" ? theme.foreground : "#fff"};
  color: ${({ theme }) => theme.background};
  word-wrap: break-word;
  overflow-wrap: anywhere;
`;
