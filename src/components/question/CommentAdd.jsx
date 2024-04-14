import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";

export default function CommentAdd({ questionData, onAddComment, changeData, setChangeData, theme }) {
  const [newComment, setNewComment] = useState("");
  const [nickName, setNickName] = useState("");
  const [userId, setUserId] = useState("");

  const sendComment = async () => {
    const commentData = {
      name: nickName,
      content: newComment,
    };
    const questionId = questionData?.id;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/questions/${questionId}/comments`,
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
        onAddComment({
          ...commentData,
          userId: userId,
          name: nickName,
          date: new Date().toLocaleString(),
        });
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setNewComment(""); // Reset input field after sending
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.id);
            setNickName(data.nickName);
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
  bottom: 10px;
  right: 0;
  justify-content: center;
  padding: 1rem;
  width: 70%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const CommentAddInput = styled.input`
  flex: 1;
  height: 40px;
  margin-right: 10px;
  padding: 0 15px;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.foreground};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.background};
  }
`;

const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 40px;
  background-color: ${({ theme }) => theme.foreground};
  color : ${({ theme }) => theme.background};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity : 0.8;
  }
`;
