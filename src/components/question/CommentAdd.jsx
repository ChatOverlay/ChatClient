import React, { useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";

export default function CommentAdd({ questionData, changeData, setChangeData, theme }) {
  const [newComment, setNewComment] = useState("");

  const sendComment = async () => {
    const commentData = {
      content: newComment,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionData?._id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(commentData),
        }
      );
      if (response.ok) {
        setChangeData(!changeData);
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setNewComment(""); // Reset input field after sending
  };



  return (
    <CommentAddContainer >
      <CommentAddInput
        
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendComment()}
        placeholder="댓글을 입력하세요..."
      />
      <CommentAddIconContainer  onClick={sendComment}>
        <ModeIcon sx={{ fontSize: "2rem", maxHeight: "100%" }} />
      </CommentAddIconContainer>
    </CommentAddContainer>
  );
}

const CommentAddContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  justify-content: center;
  padding: 1rem; 
`;

const CommentAddInput = styled.input`
  height: 3rem;
  margin-right: 0.3vw;
  padding: 0 1rem;
  font-size: 1rem;
  width: 40vw;
  border: 2px solid var(--foreground-color);
  border-radius: 2rem;
  font-family :'Noto Sans KR';
  &:focus {
    outline: none;
  }
`;

const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 3rem;
  background-color: var(--foreground-color);
  color : var(--background-color);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity : 0.8;
  }
`;
