import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { Button, TextField } from "@mui/material";

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
  const [editedTitle, setEditedTitle] = useState(questionData?.title || "");
  const [editedContent, setEditedContent] = useState(questionData?.content || "");


  useEffect(() => {
    setLikesCount(questionData?.likes?.length || 0);
    setLiked(false); // Reset liked state on question change
    setEditedTitle(questionData?.title);
    setEditedContent(questionData?.content);
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

  
  const saveChanges = async () => {
    // 모든 필드가 입력되었는지 확인
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert('제목, 내용을 모두 입력해주세요.');
      return;
    }
    const questionId = questionData?._id;
    const token = localStorage.getItem("token");
    const updatedData = {
      title: editedTitle,
      content: editedContent
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the question.");
      }
  
      const data = await response.json();
      console.log("Question updated:", data);
  
      setEditMode(false); 
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  

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
        console.log(data);
        setLiked(!liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Box theme={theme}>
      {editMode ? (
        <>
          <TextField
            label="제목"
            fullWidth
            value={editedTitle}
            onChange={(e)=>setEditedTitle(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e)=>setEditedContent(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <Button
          onClick={saveChanges}
          variant="contained"
          sx={{
            backgroundColor: theme.foreground,
            borderRadius: "0.5rem",
          }}
        >
          저장
        </Button>
        
        </>
      ) : (
        <>
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
        </>
      )}
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
    transform: scale(1.05);
  }
`;
