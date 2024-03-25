import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "../TopBar.css";

import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);

  const { QuestionId } = useParams(); // Extract roomId from URL

  return (
    <>
      <AppContainer show={closeOption}>
        <div className="top__bar">
          <div
            className="icon__container"
            onClick={() => setCloseOption(!closeOption)}
          >
            {closeOption ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
          </div>
          <div className="number__container">{QuestionId}</div>
        </div>
        <QuestionContainer>
          <Questioner />
          <QuestionContent />
          <Comment />
          <CommentAdd />
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
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: #202c39;
  border-left: 1px solid #f2d492;
  transition: all 0.3s;
  z-index: 1;
`;

//질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  
  position: relative;
  flex-direction: column;
  height: 90vh;
  color: white;
  
`;
