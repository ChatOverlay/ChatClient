import React, { useState } from "react";
import styled from "styled-components";
import ModeIcon from "@mui/icons-material/Mode";
import { useSharedState } from "../../context/SharedStateContext";

export default function CommentAdd({
  questionData,
  changeData,
  setChangeData,
  theme,
}) {
  const [newComment, setNewComment] = useState("");
  const { addNewData } = useSharedState();
  const sendComment = async () => {
    if (!newComment.trim()) {
      alert("입력할 댓글이 없습니다.");
      return;
    }
    if (window.confirm("댓글을 작성하시겠습니까?")) {
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
          setNewComment("");
          addNewData();
        } else {
          console.error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    } else {
      console.log("댓글 전송 취소됨");
    }
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
        <CommentAddIconContainer
          disabled={!newComment.trim()}
          onClick={() => newComment.trim() && sendComment()}
        >
          <ModeIcon sx={{ fontSize: "2rem", maxHeight: "100%" }} />
        </CommentAddIconContainer>
      </Wrapper>
    </CommentAddContainer>
  );
}

const CommentAddContainer = styled.div`
  display: flex;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 10;
  box-shadow: 0 -4px 4px -4px rgba(0, 0, 0, 0.5);
`;



const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;
  align-items: center;
`;

const CommentAddInput = styled.input`
  height: 3rem;
  margin-right: 0.5rem;
  padding: 0 1rem;
  font-size: 1rem;
  border: 2px solid var(--foreground-color);
  border-radius: 2rem;
  font-family: "Noto Sans KR";
  width: calc(100% - 4.8rem);
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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
  }
`;
