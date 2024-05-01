import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment-timezone";
import "./ListBox.css";
import { isLectureInSession } from "../../utils/timeUtils";

export default function ChatListBox() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/chatrooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((room) => {
          room.isActive = isLectureInSession(room.lectureTimes); // Calculate active status
        });
        // Sort rooms so that active ones are at the top
        data.sort((a, b) => b.isActive - a.isActive);
        setChatRooms(data);
      })
      .catch((error) => console.error("Fetching chat rooms failed:", error));
  }, []);

  const handleRoomClick = (room, activeSession) => {
    setSelectedRoom(room.name);
    if (activeSession) {
      navigate(`/chat/${room.id}`, {
        state: { lectureRoom: room.lectureRoom },
      });
    } else {
      navigate("/chatlist", {
        state: { message: "해당 수업시간이 아닙니다." },
      });
    }
  };

  return (
    <div className="navbar__list">
      {chatRooms.filter(room => room.lectureRoom).map((room) => {
        const activeSession = isLectureInSession(room.lectureTimes);
        const itemClasses = `navbar__list__item ${
          room.name === selectedRoom ? "selected" : ""
        } ${!activeSession ? "inactive" : ""}`; // Adding 'inactive' class conditionally

        return (
          <div
            className={itemClasses}
            key={room.id}
            onClick={() => handleRoomClick(room, activeSession)}
          >
            <div className="question-container">
              <div className="question-title-container">
                <div>
                  {room.name}
                  {activeSession ? <span>🟢</span> : <span>⚪</span>}
                </div>
              </div>
              <div className="question-date">{room.lectureRoom}</div>
              <div className="sub-title-container">{room.lectureTimes}</div>
            </div>
            <div className="icon__arrow__container">
              <ArrowForwardIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
}
