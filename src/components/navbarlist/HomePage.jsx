import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import FirstBanner from "../../assets/backgroundImg/firstbanner.jpg";
import SecondBanner from "../../assets/backgroundImg/secondbanner.jpg";
import ThirdBanner from "../../assets/backgroundImg/sky.png";
import styled from "styled-components";
import { useSharedState } from "../../context/SharedStateContext";

export default function HomePage() {
  const navigate = useNavigate();
  const [upcomingCourse, setUpcomingCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [totalMileage, setTotalMileage] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { newAdded } = useSharedState();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/homepage/courses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUpcomingCourse(data.upcomingCourse);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    }

    async function fetchUserId() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.id) {
          setCurrentUserId(data.id);
        } else {
          console.error("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    }
    fetchData();
    fetchUserId();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/homepage`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setQuestions(data.questions);
        setTotalMileage(data.totalMileage);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    }
    fetchData();
  }, [newAdded]);

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id); // 선택된 질문 ID를 상태에 저장
    navigate(`/question/${id}`);
  };
  const handleRoomClick = (room, courseId, activeSession) => {
    if (activeSession) {
      navigate(`/chat/${room}`, { state: { roomId: courseId } });
    } else {
      alert("해당 수업시간이 아닙니다.");
    }
  };

  return (
    <div className="navbar__list">
      <div className="scrollable-list-items">
        <Swiper
          className="banner"
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <img src={FirstBanner} alt="Cloud Default" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={SecondBanner} alt="Cloud Dark" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ThirdBanner} alt="Cloud Light" />
          </SwiperSlide>
        </Swiper>
        <Section>
          <SectionTitle>내 수업 바로가기</SectionTitle>
          {upcomingCourse && (
            <div
              className={`navbar__list__item_home ${
                upcomingCourse.inSession ? "" : "inactive"
              }`}
              onClick={() =>
                handleRoomClick(
                  upcomingCourse.lectureRoom,
                  upcomingCourse.courseId,
                  upcomingCourse.inSession
                )
              }
            >
              {!upcomingCourse.inSession && (
                <div className="overlay">수업 시작 전입니다</div>
              )}
              <div className="question-container">
                <div className="question-title-container">
                  <div>
                    {upcomingCourse.courseName}
                    {upcomingCourse.inSession ? (
                      <span> 🟢</span>
                    ) : (
                      <span> ⚪</span>
                    )}
                  </div>
                </div>
                <div className="question-date">
                  {upcomingCourse.lectureRoom}
                </div>
                <div className="sub-title-container">
                  {upcomingCourse.lectureTimes}
                </div>
              </div>
              <div className="icon__arrow__container">
                <ArrowForwardIcon />
              </div>
            </div>
          )}
        </Section>
        <Section>
          <SectionTitle>내 질문들({questions.length})</SectionTitle>
          {questions.length > 0 ? (
            questions.map((question) => {
              const isLikedByCurrentUser = question.likes.some(
                (like) => like.userId === currentUserId
              );
              const isCommentedByCurrentUser = question.comments.some(
                (comment) => comment.userId === currentUserId
              );
              return (
                <div
                  className={`navbar__list__item_home ${
                    question._id === selectedQuestion ? "selected" : ""
                  }`}
                  key={question._id}
                  onClick={() => handleQuestionClick(question._id)}
                >
                  <div className="question-container">
                    <div className="question-title-container">
                      <div>{question.title}</div>
                    </div>
                    <div className="question-details">
                      <span className="question-date">{question.date}</span>
                    </div>
                    <div className="sub-title-container">
                      <div>{question.className}</div>
                      {question.likes.length > 0 && (
                        <span
                          className={`likes-count ${
                            isLikedByCurrentUser ? "icon-liked" : ""
                          }`}
                        >
                          <ThumbUpAltIcon /> {question.likes.length}
                        </span>
                      )}
                      {question.comments.length > 0 && (
                        <span
                          className={`comments-count ${
                            isCommentedByCurrentUser ? "icon-liked" : ""
                          }`}
                        >
                          <ChatIcon /> {question.comments.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="icon__arrow__container">
                    <ArrowForwardIcon />
                  </div>
                </div>
              );
            })
          ) : (
            <SectionContent>작성한 글이 없습니다.</SectionContent>
          )}
        </Section>
        <Section>
          <SectionTitle>내 포인트</SectionTitle>
          {totalMileage > 0 ? (
            <div
              className={`navbar__list__item_home ${"inactive"}`}
              style={{ color: "var(--primary-color)" }}
            >
              {totalMileage} 포인트
            </div>
          ) : (
            <SectionContent>포인트 정보가 없습니다.</SectionContent>
          )}
        </Section>
      </div>
    </div>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  margin-left: 1rem;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: var(--foreground-color);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
