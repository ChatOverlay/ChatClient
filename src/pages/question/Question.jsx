import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
import TopBar from "../../components/topbar/TopBar";

import io from "socket.io-client";
import { useTheme } from "../../context/ThemeContext";

const socket = io(`${process.env.REACT_APP_API_URL}`); // Adjust the URL as necessary

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { id } = useParams(); // URL에서 질문의 id를 가져옵니다.
  const [changeData, setChangeData] = useState(true);
  const { theme } = useTheme(); // 테마 데이터 사용

  const addCommentToQuestion = (newComment) => {
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      comments: [...prevQuestionData.comments, newComment],
    }));
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        socket.emit("joinRoom", data.title);
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );

    socket.on("message", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("message");
      socket.emit("leaveRoom", questionData?.title);
    };
  }, [id, questionData?.title, changeData]);

  return (
    <>
      <AppContainer show={closeOption} theme={theme}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={questionData?.title}
        />
        <QuestionContainer theme={theme}>
          <Questioner questionData={questionData} theme={theme} />
          <QuestionContent questionData={questionData} theme={theme} />
          {questionData?.comments?.map((comment) => (
            <Comment
              key={comment.id}
              questionData={questionData}
              changeData={changeData}
              setChangeData={setChangeData}
              comment={comment}
              theme={theme}
            />
          ))}
          <CommentAdd
            questionData={questionData}
            onAddComment={addCommentToQuestion}
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
  margin-left: ${({ show }) => (show ? "5vw" : "25.1vw")};
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
  overflow-y: auto;
  margin-bottom: 5rem;
`;
