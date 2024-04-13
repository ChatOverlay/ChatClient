import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function QuestionList() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Step 1
  const [questionList, setQuestionList] = useState([]); // 상태를 빈 배열로 초기화

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/questions`) // 서버 주소에 맞게 수정해주세요
      .then((response) => response.json())
      .then((data) => setQuestionList(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id); // Step 2
    navigate(`/question/${id}`);
  };

  const handleNewQuestion = () => {
    setSelectedQuestion(null);
    navigate("question/newquestion");
  };

  return (
    <div className="navbar__list">
      <SelectLabels options={options} setOptions={setOptions} />
      {questionList
        .filter(
          (question) =>
            options === "전체 보기" || question.className === options
        )
        .map((question) => (
          <div
            className={`navbar__list__item ${
              question.id === selectedQuestion
                ? "selected"
                : ""
            }`}
            key={question.id}
            onClick={() => handleQuestionClick(question.id)}
          >
            <div className="question-container">
              <div className="question-title-container">
                <div>{question.title}</div>
                <div className="question-date">{question.date}</div>
              </div>
              <div className="sub-title-container">{question.className}</div>
            </div>
            <div className="icon__arrow__container">
              <ArrowForwardIcon />
            </div>
          </div>
        ))}
      <div className="icon-container" onClick={handleNewQuestion}>
        <DriveFileRenameOutlineIcon sx={{ color: "#202c39" }} />
      </div>
    </div>
  );
}
