import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";


export default function CommentAdd({questionData,onAddComment}) {
  const [newComment, setNewComment] = useState("");
 const [nickName,setNickName] = useState("")
  // 서버로 새 댓글 데이터 전송
  const sendComment = async () => {
    const commentData = {
      name : nickName,
      content: newComment // 'name'과 'date'는 서버 측에서 처리
    };
    const questionId = questionData?.id;
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
    
    try {
      const response = await fetch(`http://localhost:4000/api/questions/${questionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Authorization 헤더에 토큰 추가
        },
        body: JSON.stringify(commentData)
      });
      if (response.ok) {
        const updatedQuestion = await response.json();
        console.log('댓글 추가 성공:', updatedQuestion);
        onAddComment({ ...commentData, name: nickName, date: new Date().toLocaleString() }); // 댓글 추가 후 UI 업데이트
      } else {
        console.error('댓글 추가 실패');
      }
    } catch (error) {
      console.error('댓글 추가 중 에러 발생:', error);
    }
    
    setNewComment(""); // 입력 필드 초기화
  };
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/user/info", {
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
            },
          });
          if (response.ok) {
            const data = await response.json();
            setNickName(data.nickName); // 응답으로 받은 닉네임으로 상태 업데이트
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);
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
