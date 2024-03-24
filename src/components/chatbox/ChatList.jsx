import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ChatList() {
  const navigate = useNavigate();

  const chatRooms = ["room1", "room2"]; // Example chat rooms

  return (
    <ChatBox>
      {chatRooms.map((room) => (
        <ChatRoom key={room} onClick={() => navigate(`/chat/${room}`)}>
          {room}
        </ChatRoom>
      ))}
    </ChatBox>
  );
}

const ChatBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: #202c39;
  color: white;
  margin-left: 5vw;
  height: 100vh;
  width: 20vw;
  font-weight: bold;
  border-left: 1px solid #f2d492;
`;

const ChatRoom = styled.div`
  cursor: pointer;
  padding: 10px;
  height: 3rem;
  transition: all 0.3s;
  border-bottom: 1px solid #f2d492;
  &:hover {
    background-color: #f2d492;
  }
`;
