import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./ListBox.css";
import { isLectureInSession } from "../../utils/timeUtils";
import { PulseLoader } from "react-spinners";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";

export default function ChatListBox() {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLoadingTimeout(loading, 5000); //로딩 시간 넘을 시 Login 창으로 가게 처리

  useEffect(() => {
    const fetchChatRooms = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/chatrooms`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach(
          (room) => (room.isActive = isLectureInSession(room.lectureTimes))
        );
        data.sort((a, b) => b.isActive - a.isActive);
        setChatRooms(data);
        setError(null);
      } catch (err) {
        setError("Failed to load chat rooms.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []); // Ensure this is only called once on initial render.

  const handleRoomClick = (room, activeSession) => {
    setSelectedRoom(room.name);
    if (activeSession) {
      navigate(`/chat/${room.lectureRoom}`, { state: { roomId: room.id } });
    } else {
      alert("해당 수업시간이 아닙니다.");
    }
  };

  return (
    <div className="navbar__list">
      <div className="scrollable-list-items">
        {loading ? (
          <div className="loading-container">
            <PulseLoader
              size={15}
              color={"var(--foreground-color)"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {chatRooms
              .filter((room) => room.lectureRoom)
              .map((room) => {
                const activeSession = isLectureInSession(room.lectureTimes);
                const itemClasses = `navbar__list__item ${
                  activeSession && room.name === selectedRoom ? "selected" : ""
                } ${!activeSession ? "inactive" : ""}`;

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
                          {activeSession ? <span> 🟢</span> : <span> ⚪</span>}
                        </div>
                      </div>
                      <div className="question-date">{room.lectureRoom}</div>
                      <div className="sub-title-container">
                        {room.lectureTimes}
                      </div>
                    </div>
                    <div className="icon__arrow__container">
                      <ArrowForwardIcon />
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
