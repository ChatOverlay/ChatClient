import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";

export default function ChatListBox() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null); 

  const chatRooms = ["room1", "room2"]; // Example chat rooms

  const handleRoomClick = (room) => {
    setSelectedRoom(room); 
    navigate(`/chat/${room}`);
  };

  return (
    <div className="navbar__list">
      {chatRooms.map((room) => (
        <div
          className={`navbar__list__item ${room === selectedRoom ? "selected" : ""}`} 
          key={room}
          onClick={() => handleRoomClick(room)}
        >
          {room}
        </div>
      ))}
    </div>
  );
}
