import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "../TopBar.css";

import { useParams } from "react-router-dom";
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
      </AppContainer>
    </>
  );
}

//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: #202c39;
  border-left: 1px solid #f2d492;
  flex-direction: column;

  transition: all 0.3s;
  z-index: 1;
`;
