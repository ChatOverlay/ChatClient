import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "styled-components";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function QuestionList() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Step 1
  const [questionList, setQuestionList] = useState([]); // 상태를 빈 배열로 초기화

  useEffect(() => {
    fetch('http://localhost:4000/api/questions') // 서버 주소에 맞게 수정해주세요
      .then(response => response.json())
      .then(data => setQuestionList(data))
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

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
          
          <div className="icon__arrow__container"><ArrowForwardIcon/></div>
        </div>
        
      ))}
      <IconContainer onClick={() => {navigate("./question/newquestion")}}>
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
