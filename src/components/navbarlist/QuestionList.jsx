import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "styled-components";

export default function QuestionListBox() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const questionList = [
    { id: 1, title: "Question1", subTitle: "어려운 시대" },
    { id: 2, title: "Question2", subTitle: "희망의 메시지" }, // Note the title change here for clarity
  ]; // Example question rooms

  return (
    <div className="navbar__list">
      <SelectLabels options={options} setOptions={setOptions} />
      {questionList.map((room) => (
        <div
          className="navbar__list__item"
          key={room.id} // Use the room's id as the key
          onClick={() => navigate(`/question/${room.id}`)} // Navigate using room's id
        >
          <QuestionTitle>
            <div>{room.title}</div>
            <SubTitleContainer>{room.subTitle}</SubTitleContainer>
          </QuestionTitle>
        </div>
      ))}
      <IconContainer>
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
