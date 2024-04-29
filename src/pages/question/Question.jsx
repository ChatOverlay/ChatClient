import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
import TopBar from "../../components/topbar/TopBar";
import { useTheme } from "../../context/ThemeContext";

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { id } = useParams();
  const [changeData, setChangeData] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );
  }, [id, changeData, editMode]);
  useEffect(() => {
    setEditMode(false);
  }, [id]);
  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={questionData?.className}
        />
        <QuestionContainer theme={theme}>
          <Questioner
            questionData={questionData}
            theme={theme}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <QuestionContent
            questionData={questionData}
            theme={theme}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          {questionData?.comments?.map((comment) => (
            <Comment
              key={comment._id}
              questionData={questionData}
              changeData={changeData}
              setChangeData={setChangeData}
              comment={comment}
              theme={theme}
            />
          ))}
          <CommentAdd
            questionData={questionData}
            changeData={changeData}
            setChangeData={setChangeData}
            
            theme={theme}
          />
        </QuestionContainer>
      </AppContainer>
    </>
  );
}
const slideInFromLeft = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25.05vw")};
  background-color: var(--background-color); // 테마 적용
  transition: all 0.3s;
  z-index: 1;
  animation: ${slideInFromLeft} 1s ease-out forwards; // Apply the animation
`;

const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 90vh;
  color: var(--foreground-color);
  margin-bottom: 5rem;
  overflow-y: auto; // 스크롤바가 필요할 경우 표시

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f9f9f9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--foreground-color); // 여기서 적절한 테마 색상을 사용
    border-radius: 5px;
    border: 2px solid #f9f9f9;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }
`;
