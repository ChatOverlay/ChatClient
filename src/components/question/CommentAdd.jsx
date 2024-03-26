import React, { useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";
import io from "socket.io-client";

// 서버와의 연결을 설정
const socket = io("http://localhost:4000");

export default function CommentAdd() {
  const [newComment, setNewComment] = useState("");

  // 서버로 새 댓글 데이터 전송
  const sendComment = () => {
    socket.emit("message", { name: "사용자 이름", date: new Date().toLocaleString(), content: newComment }, "room1");
    setNewComment(""); // 입력 필드 초기화
  };

  return (
    <CommentAddContainer>
      <CommentAddInput 
        value={newComment} 
        onChange={(e) => setNewComment(e.target.value)} 
        onKeyPress={(e) => e.key === 'Enter' && sendComment()} // Enter 키를 누르면 sendComment 실행
      />
      <CommentAddIconContainer onClick={sendComment}>
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
