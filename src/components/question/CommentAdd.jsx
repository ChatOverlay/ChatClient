import React, { useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";

export default function CommentAdd({
  questionData,
  changeData,
  setChangeData,
  theme,
}) {
  const [newComment, setNewComment] = useState("");

  const sendComment = async () => {
    const commentData = {
      content: newComment,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${
          questionData?._id
        }/comments`,
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
    <CommentAddContainer>
      <Wrapper>
        <CommentAddInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendComment()}
          placeholder="댓글을 입력하세요..."
        />
        <CommentAddIconContainer onClick={sendComment}>
          <ModeIcon sx={{ fontSize: "2rem", maxHeight: "100%" }} />
        </CommentAddIconContainer>
      </Wrapper>
    </CommentAddContainer>
  );
}

const CommentAddContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;  // end 대신 flex-end를 사용
  width: 100%;  // min-width 대신 width 사용
  padding: 1rem;
`;

const CommentAddInput = styled.input`
  height: 3rem;
  margin-right: 0.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 2px solid var(--foreground-color);
  border-radius: 2rem;
  font-family: "Noto Sans KR";
  width: calc(100% - 4.8rem);  // 아이콘의 너비를 고려하여 조정
  &:focus {
    outline: none;
  }
`;

const CommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3.5rem;
  min-height: 3rem;
  background-color: var(--foreground-color);
  color: var(--background-color);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
