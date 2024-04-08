import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";

export default function CommentAdd({ questionData, onAddComment , changeData, setChangeData }) {
  const [newComment, setNewComment] = useState("");
  const [nickName, setNickName] = useState("");
  const [userId, setUserId] = useState("");
  // 서버로 새 댓글 데이터 전송
  const sendComment = async () => {
    const commentData = {
      name: nickName,
      content: newComment, // 'name'과 'date'는 서버 측에서 처리
    };
    const questionId = questionData?.id;
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    try {
      const response = await fetch(
        `http://localhost:4000/api/questions/${questionId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
          body: JSON.stringify(commentData),
        }
      );
      if (response.ok) {
        const updatedQuestion = await response.json();
        setChangeData(!changeData);
        console.log("댓글 추가 성공:", updatedQuestion);
        onAddComment({
          ...commentData,
          userId : userId,
          name: nickName,
          date: new Date().toLocaleString(),
        }); // 댓글 추가 후 UI 업데이트
      } else {
        console.error("댓글 추가 실패");
      }
    } catch (error) {
      console.error("댓글 추가 중 에러 발생:", error);
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

            setUserId(data.id); // 현재 사용자의 ID를 상태에 저장
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
        onKeyDown={(e) => e.key === "Enter" && sendComment()} // Enter 키를 누르면 sendComment 실행
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
  bottom: 10px;
  right: 0;
  justify-content: center;
  padding: 1rem;
  width: 70%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); // 상단 그림자로 입체감 추가
`;

// 댓글 추가 칸
const CommentAddInput = styled.input`
  flex: 1; // 컨테이너 너비에 맞게 조정
  height: 40px; // 높이 조정
  margin-right: 10px; // 버튼과의 간격
  padding: 0 15px;
  font-size: 1rem; // 폰트 사이즈 조정
  border: 2px solid #f2d492; // 테두리 스타일 조정
  border-radius: 20px; // 둥근 테두리
  background-color: #fff; // 배경색 설정
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // 그림자 효과로 입체감 추가
  &:focus {
    outline: none; // 포커스 시 테두리 제거
    border-color: #c9a063; // 포커스 시 테두리 색상 변경
  }
`;

// 댓글 추가 버튼
const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; // 너비 조정
  height: 40px; // 높이 조정
  background-color: #f2d492;
  border-radius: 20px; // 둥근 테두리
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #c9a063; // 호버 시 배경색 변경
  }
`;
