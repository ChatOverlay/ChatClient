import React, { useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";


export default function CommentAdd({questionData,onAddComment}) {
  const [newComment, setNewComment] = useState("");

  // 서버로 새 댓글 데이터 전송
  const sendComment = async () => {
    const commentData = {
      name: "사용자 이름",
      date: new Date().toLocaleString(),
      content: newComment
    };
    const questionId = questionData?.id;
    try {
      const response = await fetch(`http://localhost:4000/api/questions/${questionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });
      if (response.ok) {
        const updatedQuestion = await response.json();
        console.log('댓글 추가 성공:', updatedQuestion);
        onAddComment(commentData); // 새 댓글을 상위 컴포넌트의 상태에 추가
      } else {
        console.error('댓글 추가 실패');
      }
    } catch (error) {
      console.error('댓글 추가 중 에러 발생:', error);
    }
    
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
