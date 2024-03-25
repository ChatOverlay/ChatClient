import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "styled-components";

export default function QuestionListBox() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Step 1

  const questionList = [
    { id: 1, title: "Question1", subTitle: "어려운 시대" , className : "소프트웨어공학"},
    { id: 2, title: "Question2", subTitle: "희망의 메시지" ,className :"IT와 창업"},
  ];

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id); // Step 2
    navigate(`/question/${id}`);
  };

return (
  <div className="navbar__list">
    <SelectLabels options={options} setOptions={setOptions} />
    {questionList
      .filter((question) => options === "전체 보기" || question.className === options) // Filter logic
      .map((question) => (
        <div
          className={`navbar__list__item ${question.id === selectedQuestion ? "selected" : ""}`}
          key={question.id}
          onClick={() => handleQuestionClick(question.id)}
        >
          <QuestionTitle>
            <div>{question.title}</div>
            <SubTitleContainer>{question.subTitle}</SubTitleContainer>
          </QuestionTitle>
        </div>
      ))}
    <IconContainer onClick={() => {/* Icon click action */}}>
      <DriveFileRenameOutlineIcon sx={{ color: "#202c39" }} />
    </IconContainer>
  </div>
);

}

const QuestionTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubTitleContainer = styled.div`
  padding-top: 0.3rem;
  font-weight: normal;
  font-size: 0.8rem;
`;

const IconContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 1.5rem;
  right : 1.5rem;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #202c39;
  background-color: #f2d492;
  border-radius: 20rem;
  
  height : 3rem;
  width : 3rem;
  cursor: pointer;
  transition : all 0.3s;
  &:hover {
    opacity : 0.6;
  }
`;
