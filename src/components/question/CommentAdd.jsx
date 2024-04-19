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
        `${process.env.REACT_APP_API_URL}/api/questions/${questionData?._id}/comments`,
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
    <CommentAddContainer theme={theme}>
      <CommentAddInput
        theme={theme}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendComment()}
      />
      <CommentAddIconContainer theme={theme} onClick={sendComment}>
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
  width : 72vw;
`;

const CommentAddInput = styled.input`
  flex: 1;
  height: 3rem;
  margin-right: 1vw;
  padding: 0 1rem;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.foreground};
  border-radius: 2rem;
  &:focus {
    outline: none;
  }
`;

const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
  height: 3rem;
  background-color: ${({ theme }) => theme.foreground};
  color : ${({ theme }) => theme.background};
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity : 0.8;
  }
`;
