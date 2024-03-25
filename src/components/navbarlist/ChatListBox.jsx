import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css"
export default function ChatListBox() {
  const navigate = useNavigate();

  const chatRooms = ["room1", "room2"]; // Example chat rooms

  return (
    <div className="navbar__list">
      {chatRooms.map((room) => (
        <div className="navbar__list__item" key={room} onClick={() => navigate(`/chat/${room}`)}>
          {room}
        </div>
      ))}
    </div>
  );
}


