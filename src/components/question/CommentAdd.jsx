import React from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";
export default function CommentAdd() {
  return (
    <CommentAddContainer>
      <CommentAddInput></CommentAddInput>
      <CommentAddIconContainer>
        <ModeIcon sx={{ fontSize: "2rem", maxHeight: "100%" }} />
      </CommentAddIconContainer>
    </CommentAddContainer>
  );
}

//-----------댓글 추가 부분-------------
//댓글 추가 컨테이너
const CommentAddContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  bottom: 0;
`;

//댓글 추가 칸
const CommentAddInput = styled.input`
  display: flex;
  height: 5vh;
  padding-left: 1rem;
  font-size: 2rem;
`;

//댓글 추가 버튼
const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  background-color: #f2d492;
  cursor: pointer;
  transition: all 0.3s opacity;
  &:hover {
    opacity: 0.6;
  }
`;
