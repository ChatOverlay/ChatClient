import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSharedState } from "../../context/SharedStateContext";

export default function QuestionList() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { newAdded } = useSharedState();
  console.log(questionList);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰을 로컬 스토리지에서 가져옴
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setCurrentUserId(data.id);
        } else {
          console.error("User ID not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/questions`)
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b._id.localeCompare(a._id));
        setQuestionList(sortedData);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [newAdded]);

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id);
    navigate(`/question/${id}`);
  };

  const handleNewQuestion = () => {
    setSelectedQuestion(null);
    navigate("question/newquestion");
  };

  return (
    <div className="navbar__list">
      <div className="sticky-container">
        <SelectLabels options={options} setOptions={setOptions} />
        <div className="mobile-icon-container" onClick={handleNewQuestion}>
          작성하기
        </div>
      </div>
      <div className="scrollable-list-items">
        {questionList
          .filter(
            (question) =>
              options === "전체 보기" || question.className === options
          )
          .map((question) => {
            // 현재 사용자가 이 질문을 좋아요 했는지 검사
            const isLikedByCurrentUser = question.likes.some(
              (like) => like.userId === currentUserId
            );
            const isCommentedByCurrentUser = question.comments.some(
              (comment) => comment.userId === currentUserId
            );

            return (
              <div
                className={`navbar__list__item ${
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
                      <span className={`comments-count ${
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
          })}
      </div>
      <div className="icon-container" onClick={handleNewQuestion}>
        <DriveFileRenameOutlineIcon
          sx={{ color: `${({ theme }) => theme.foreground}` }}
        />
      </div>
    </div>
  );
}
