import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
import TopBar from "../../components/topbar/TopBar";
import { useTheme } from "../../context/ThemeContext";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { id } = useParams();
  const [changeData, setChangeData] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const { theme } = useTheme();

  useMobileNavigate(closeOption, "/question");

 // 조건부 API 요청
 useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`)
      .then(response => response.json())
      .then(data => {
        setQuestionData(data);
      })
      .catch(error => {
        console.error("Error fetching question detail:", error);
      });
}, [id, changeData, editMode]);

  useEffect(() => {
    setEditMode(false);
    setCloseOption(false);
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

const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  color: var(--foreground-color);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--background-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--foreground-color);
    border-radius: 5px;
    border: 2px solid var(--background-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }
`;
