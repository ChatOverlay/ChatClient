import React, { useState } from "react";
import QuestionContent from "../../question/QuestionContent";
import Questioner from "../../question/Questioner";
import { useTheme } from "../../../context/ThemeContext";
import styled from "styled-components";
import CommentModal from "../../modals/CommentModal";
import "../ListBox.css";

export default function QuestionGrid({ questionList, editMode, setEditMode}) {
  const { theme } = useTheme();
  const [commentToggle, setCommentToggle] = useState(false);
  
  const [changeData, setChangeData] = useState(true);
  return (
    <div className="grid__list">
      {questionList.map((question) => (
        <div key={question._id}>
          <CourseName>{question.className}</CourseName>
          <Questioner
            questionData={question}
            theme={theme}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <QuestionContent
            questionData={question}
            theme={theme}
            setCommentToggle={setCommentToggle}
            editMode={editMode}
            setEditMode={setEditMode}
            imgModalAble={false}
          />
          {commentToggle && (
            <CommentModal
              question={question}
              theme={theme}
              setCommentToggle={setCommentToggle}
              commentToggle={commentToggle}
              changeData={changeData}
              setChangeData={setChangeData}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const CourseName = styled.div`
  display: flex;
  padding: 0.5rem 0 0.5rem 1rem;
  font-size: 1.5rem;
  background-color: var(--foreground-color);
  color: var(--background-color);
  margin-bottom: -3rem;
`;
