import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./ListBox.css";

export default function ChatListBox() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/chatrooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => setChatRooms(data))
    .catch(error => console.error("Fetching chat rooms failed:", error));
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room.name);
    navigate(`/chat/${room.id}`); // 사용자가 선택한 과목 ID로 라우팅
  };

  return (
    <div className="navbar__list">
      {chatRooms.map((room) => (
        <div
          className={`navbar__list__item ${room.name === selectedRoom ? "selected" : ""}`} 
          key={room.id} // 각 항목의 key를 고유 ID로 설정
          onClick={() => handleRoomClick(room)}
        >
          <div>{room.name}</div>
          <div className="icon__arrow__container"><ArrowForwardIcon/></div>
        </div>
      ))}
    </div>
  );
}
