import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"; // 비활성 상태 아이콘
import ChatIcon from "@mui/icons-material/Chat";

export default function QuestionContent({ questionData }) {
  const commentsCount = questionData?.comments?.length || 0;
  const [likesCount,setLikesCount] = useState(questionData?.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // 사용자 인증 토큰을 가져옵니다.
    const token = localStorage.getItem('token');
    if (token && questionData?.likes) {
      // 현재 사용자가 'likes' 배열에 있는지 확인합니다. 
      // 이 예시에서는 사용자의 ID가 'userId'라고 가정합니다.
      const userId = token; // 실제 사용자 ID로 대체해야 합니다.
      const isLiked = questionData.likes.some(like => like.id === userId);
      setLiked(isLiked);
    }
  }, [questionData]);

    // '좋아요' 버튼 클릭 핸들러
    const toggleLike = async () => {
      const questionId = questionData?.id;
      const token = localStorage.getItem('token'); // 사용자 인증을 위한 토큰
      try {
          const response = await fetch(`http://localhost:4000/api/questions/${questionId}/like`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // 토큰을 헤더에 포함
              },
          });

          if (!response.ok) {
              throw new Error('Server response was not ok.');
          }

          const data = await response.json();
          if (data.success) {
              setLiked(!liked); // 좋아요 상태 토글
              setLikesCount(data.likesCount); // 좋아요 수 업데이트
          }
      } catch (error) {
          console.error('Error toggling like:', error);
      }
  };
  return (
    <Box>
      <Title>{questionData?.title}</Title>
      <Content>{questionData?.content}</Content>
      <IconContainer>
        <div>
          <ThumbUpAltIcon /> {likesCount}
        </div>
        <div>
          <ChatIcon /> {commentsCount}
        </div>
      </IconContainer>
      <LikeButton onClick={toggleLike}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
      </LikeButton>
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
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0.2rem;
  gap: 1rem;
  color: #f2d492;
`;

const LikeButton = styled.div`
  display: flex;
  width: 5rem;
  height: 2rem;
  border-radius : 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color : #202c39;
  background-color : #f2d492;
  margin-left: 0.3rem;
  transition: all 0.3s;
  &:hover {
    opacity : 0.8;
  }
`;