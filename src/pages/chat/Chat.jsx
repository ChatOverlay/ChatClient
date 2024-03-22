import React, { useEffect, useState } from 'react'; // useEffect 추가
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io('http://localhost:4000'); // 서버 주소를 여러분의 서버 주소로 변경하세요

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // 서버로부터 받은 메시지들을 저장할 상태

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    // 서버로부터 메시지를 받는 이벤트 리스너
    socket.on('message', (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    // 컴포넌트가 언마운트될 때 리스너를 정리
    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <ChatContainer>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // 수정: onSubmit을 onKeyPress로 변경
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // 받은 메시지들을 화면에 표시
        ))}
      </div>
    </ChatContainer>
  );
}
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #202c39;
  color: #f2d492;
  font-family: "KBO-Dia-Gothic";
`;
