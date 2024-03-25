import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";
export default function QuestionListBox() {
  const navigate = useNavigate();
  const [options, setOptions] = useState("전체 보기");
  const questionList = ["Question1", "Question2"]; // Example question rooms

  return (
    <div className="navbar__list">
      <SelectLabels options={options} setOptions={setOptions} />
      {questionList.map((room) => (
        <div
          className="navbar__list__item"
          key={room}
          onClick={() => navigate(`/question/${room}`)}
        >
          {room}
        </div>
      ))}
    </div>
  );
}
