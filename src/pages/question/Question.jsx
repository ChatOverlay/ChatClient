import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
import TopBar from "../../components/topbar/TopBar";

import io from "socket.io-client";

const socket = io(`${process.env.REACT_APP_API_URL}`); // Adjust the URL as necessary

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { id } = useParams(); // URL에서 질문의 id를 가져옵니다.
  const [changeData, setChangeData] = useState(true);
  const addCommentToQuestion = (newComment) => {
    setQuestionData((prevQuestionData) => ({
      ...prevQuestionData,
      comments: [...prevQuestionData.comments, newComment],
    }));
  };
  console.log(questionData);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/questions/${id}`) // Adjust URL as necessary
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        socket.emit("joinRoom", data.title); // Use a property that identifies the room, adjust as necessary
      })
      .catch((error) =>
        console.error("Error fetching question detail:", error)
      );

    socket.on("message", (message) => {
      console.log(message); // Handle real-time messages here
      // You might want to update state to render messages
    });

    return () => {
      socket.off("message");
      socket.emit("leaveRoom", questionData?.title); // Handle leaving room when component unmounts, adjust as necessary
    };
  }, [id, questionData?.title, changeData]);

  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={questionData?.question}
        />
        <QuestionContainer>
          <Questioner questionData={questionData} />
          <QuestionContent questionData={questionData} />
          {questionData?.comments?.map((comment) => (
            <Comment
              key={comment.id}
              questionData={questionData}
              changeData={changeData}
              setChangeData={setChangeData}
              comment={comment}
            />
          ))}
          <CommentAdd
            questionData={questionData}
            onAddComment={addCommentToQuestion}
            changeData={changeData}
            setChangeData={setChangeData}
          />
        </QuestionContainer>
      </AppContainer>
    </>
  );
}

//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25.1vw")};
  background-color: #202c39;
  transition: all 0.3s;
  z-index: 1;
`;

//질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 90vh;
  color: white;
  
  overflow-y: auto; // 콘텐츠가 넘칠 때 스크롤 가능
  margin-bottom: 5rem; // 여기로 이동
`;
