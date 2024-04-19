import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatIcon from "@mui/icons-material/Chat";

export default function QuestionContent({
  questionData,
  theme,
  editMode,
  setEditMode,
}) {
  const commentsCount = questionData?.comments?.length || 0;
  const [likesCount, setLikesCount] = useState(
    questionData?.likes?.length || 0
  );
  const [liked, setLiked] = useState(false);
  

  useEffect(() => {
    setLikesCount(questionData?.likes?.length || 0);
    setLiked(false); // Reset liked state on question change
    const questionId = questionData?._id;
    const token = localStorage.getItem("token");
    if (token && questionId) {
      const fetchLikeStatus = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/questions/${questionId}/like`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Server response was not ok.");
          }

          const data = await response.json();
          setLiked(data.isLiked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      };

      fetchLikeStatus();
    }
  }, [questionData]);

  const toggleLike = async () => {
    const questionId = questionData?._id;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/questions/${questionId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }

      const data = await response.json();
      if (data.success) {
        setLiked(!liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Box theme={theme}>
      <Title theme={theme}>{questionData?.title}</Title>
      <Content theme={theme}>{questionData?.content}</Content>
      <LikeButton theme={theme} onClick={toggleLike}>
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

const Box = styled.div`
  padding: 0.5rem;
  padding-left: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.foreground};
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: ${({ theme }) => theme.primaryColor};
`;

const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.8rem;
  padding: 0.2rem;
  color: ${({ theme }) => theme.primaryColor};
`;

const IconContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.2rem;
  gap: 1rem;
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
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.foreground};
  margin-left: 0.3rem;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
