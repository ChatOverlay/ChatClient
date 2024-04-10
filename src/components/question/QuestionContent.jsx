import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"; // 비활성 상태 아이콘
import ChatIcon from "@mui/icons-material/Chat";

export default function QuestionContent({ questionData }) {
  const commentsCount = questionData?.comments?.length || 0;
  const [likesCount, setLikesCount] = useState(
    questionData?.likes?.length || 0
  );
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikesCount(questionData?.likes?.length || 0); // 좋아요 수 초기화

    const checkLikedStatus = async () => {
      const questionId = questionData?.id;
      const token = localStorage.getItem("token");
      if (token && questionId) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/questions/${questionId}/like`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
              },
            }
          );

          if (!response.ok) {
            throw new Error("Server response was not ok.");
          }

          const data = await response.json();
          setLiked(data.isLiked); // 서버로부터 받은 좋아요 상태로 업데이트
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      }
    };
    if (questionData) {
      checkLikedStatus();
    }
  }, [questionData]);

  // '좋아요' 버튼 클릭 핸들러
  const toggleLike = async () => {
    const questionId = questionData?.id;
    const token = localStorage.getItem("token"); // 사용자 인증을 위한 토큰
    try {
      const response = await fetch(
        `http://localhost:4000/api/questions/${questionId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }

      const data = await response.json();

      if (data.success) {
        setLiked(!liked); // 좋아요 상태 토글
        setLikesCount(data.likesCount); // 좋아요 수 업데이트
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  return (
    <Box>
      <Title>{questionData?.title}</Title>
      <Content>{questionData?.content}</Content>
      <LikeButton onClick={toggleLike}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </LikeButton>
      <IconContainer>
        <div>
          <ThumbUpAltIcon /> {likesCount}
        </div>
        <div>
          <ChatIcon /> {commentsCount}
        </div>
      </IconContainer>
    </Box>
  );
}

//-----------질문 내용 부분-------------
const Box = styled.div`
  padding: 0.5rem;
  padding-left: 2rem;
  border-bottom: 1px solid #f2d492;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.8rem;
  padding: 0.2rem;
`;

const IconContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.2rem;
  gap: 1rem;
  color: #f2d492;
`;

const LikeButton = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #202c39;
  background-color: #f2d492;
  margin-left: 0.3rem;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
