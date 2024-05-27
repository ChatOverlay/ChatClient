import React, { useState } from "react";
import QuestionContent from "../../question/QuestionContent";
import Questioner from "../../question/Questioner";
import { useTheme } from "../../../context/ThemeContext";
import styled from "styled-components";
import CommentModal from "../../modals/CommentModal";
import "../ListBox.css"

export default function QuestionGrid({ questionList }) {
  const { theme } = useTheme();
  const [commentToggle, setCommentToggle] = useState(false);
  return (
    <div className="grid__list">
      {questionList.map((question) => (
        <div key={question.id}>
          <CourseName>{question.className}</CourseName>
          <Questioner questionData={question} theme={theme} />
          <QuestionContent
            questionData={question}
            theme={theme}
            setCommentToggle={setCommentToggle}
          />
          {commentToggle && (
            <CommentModal
              question={question}
              theme={theme}
              setCommentToggle={setCommentToggle}
              commentToggle={commentToggle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const CourseName = styled.div`
  display: flex;
  padding: 1.5rem 0 0 1.5rem;
  margin-bottom: -3rem;
`;
