import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
    fetch(`${process.env.REACT_APP_API_URL}/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );
  }, [id,changeData,editMode]);

  return (
    <>
      <AppContainer show={closeOption} theme={theme}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={questionData?.className}
        />
        <QuestionContainer theme={theme}>
          <Questioner questionData={questionData} theme={theme} editMode={editMode} setEditMode={setEditMode}/>
          <QuestionContent questionData={questionData} theme={theme} editMode={editMode} setEditMode={setEditMode}/>
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

// App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25.05vw")};
  background-color: ${({ theme }) => theme.background}; // 테마 적용
  transition: all 0.3s;
  z-index: 1;
`;

// 질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 90vh;
  color: ${({ theme }) => theme.foreground}; // 테마 적용
  margin-bottom: 0.5rem;
`;
