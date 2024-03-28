import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./ListBox.css";

export default function ChatListBox() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null); 

  const chatRooms = ["room1", "room2"]; // Example chat rooms

  const handleRoomClick = (titleName) => {
    setSelectedRoom(titleName); 
    navigate(`/chat/${titleName}`);
  };

  return (
    <div className="navbar__list">
      {chatRooms.map((room) => (
        <div
          className={`navbar__list__item ${room === selectedRoom ? "selected" : ""}`} 
          key={room}
          onClick={() => handleRoomClick(room)}
        >
          <div>
          {room}
          </div>
          <div className="icon__arrow__container"><ArrowForwardIcon/></div>
        </div>
      ))}
    </div>
  );
}
