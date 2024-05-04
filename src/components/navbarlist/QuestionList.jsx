import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSharedState } from "../../context/SharedStateContext";

export default function QuestionList() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionList, setQuestionList] = useState([]); // 상태를 빈 배열로 초기화
  const { newAdded } = useSharedState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/questions`)
      .then((response) => response.json())
      .then((data) => setQuestionList(data))
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
      {questionList
        .filter(
          (question) =>
            options === "전체 보기" || question.className === options
        )
        .map((question) => (
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
              <div className="question-date">{question.date}</div>
              <div className="sub-title-container">{question.className}</div>
            </div>
            <div className={`icon__arrow__container ${
              question._id === selectedQuestion ? "selected" : ""
            }`}>
              <ArrowForwardIcon />
            </div>
          </div>
        ))}
      <div className="icon-container" onClick={handleNewQuestion}>
        <DriveFileRenameOutlineIcon
          sx={{ color: `${({ theme }) => theme.foreground}` }}
        />
      </div>
    </div>
  );
}
