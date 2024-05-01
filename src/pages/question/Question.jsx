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
          <CommentContainer>
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
          </CommentContainer>
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
  overflow: hidden; // 스크롤바 숨기기
`;

const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 90vh;
  color: var(--foreground-color);
`;

const CommentContainer = styled.div`
  height: 40vh;
  max-height: 40vh;
  overflow-y: auto; // 내용이 30vh를 초과할 경우 스크롤바 표시
  border-bottom: 1px solid var(--foreground-color);
  &::-webkit-scrollbar {
    width: 8px; // 스크롤바 폭
    background-color: var(--background-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--foreground-color);
    border-radius: 5px;
    border: 2px solid var(--background-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3; // 호버 시 스크롤바 색상 변경
  }
`;
