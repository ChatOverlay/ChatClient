import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment-timezone";
import "./ListBox.css";

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

  const isLectureInSession = (lectureTimes) => {
    if (!lectureTimes) return false; // Ensure lectureTimes is defined

    const scheduleMap = {
      1: "09:00-10:00",
      2: "10:00-11:00",
      3: "11:00-12:00",
      4: "12:00-13:00",
      5: "13:00-14:00",
      6: "14:00-15:00",
      7: "15:00-16:00",
      8: "16:00-17:00",
      9: "17:00-18:00",
      10: "18:00-19:00",
      11: "19:00-20:00",
      12: "20:00-21:00",
      13: "21:00-22:00",
    };
    const dayOfWeek = {
      월: "Monday",
      화: "Tuesday",
      수: "Wednesday",
      목: "Thursday",
      금: "Friday",
    };
    const currentKoreaTime = moment().tz("Asia/Seoul");

    return lectureTimes.split(",").some((time) => {
      const [day, period] = time.match(/(\D+)(\d+)/).slice(1);
      const today = dayOfWeek[day];
      const todayInKorea = currentKoreaTime.format("dddd");

      const [start, end] = scheduleMap[period].split("-");
      const startTime = moment.tz(
        `${currentKoreaTime.format("YYYY-MM-DD")} ${start}`,
        "Asia/Seoul"
      );
      const endTime = moment.tz(
        `${currentKoreaTime.format("YYYY-MM-DD")} ${end}`,
        "Asia/Seoul"
      );
      return (
        todayInKorea === today && currentKoreaTime.isBetween(startTime, endTime)
      );
    });
  };

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
      {chatRooms.map((room) => {
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
