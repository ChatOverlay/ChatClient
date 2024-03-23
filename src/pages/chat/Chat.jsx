import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io('http://localhost:4000'); // 여러분의 서버 주소로 변경하세요

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (message) {
      const messageObject = { user: 'me', text: message };
      socket.emit('message', messageObject);
      setMessage('');
      scrollToBottom();
    }
  };

  useEffect(() => {
    socket.on('message', (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      scrollToBottom();
    });

    return () => {
      socket.off('message');
    };
  }, []);

  return (
    <ChatContainer>
      <MessagesContainer>
      {messages.map((msg, index) => (
        <Message key={index} user={msg.user}>{msg.text}</Message>
      ))}
      <div ref={messagesEndRef} />
    </MessagesContainer>
    <InputContainer>
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button>
  </InputContainer>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
position: fixed;
bottom: 0;
right: 0;
padding: 20px;
display: flex;
flex-direction: column; // 메시지를 아래에서 위로 쌓도록 설정
align-items: flex-end;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: #fff;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column; // 메시지를 아래부터 쌓아 올림
  overflow-y: auto;
  width: 100%;
  padding: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 20px;
  color: white;
  ${(props) =>
    props.user === 'me'
      ? `
          margin-left: auto;
          background-color: #ffeb3b; // 자신의 메시지 색
          color: black;
        `
      : `
          margin-right: auto;
          background-color: #007bff; // 상대방의 메시지 색
        `}
`;
