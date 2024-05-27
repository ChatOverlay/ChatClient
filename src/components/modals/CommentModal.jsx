import React from "react";
import styled, { keyframes } from "styled-components";
import Comment from "../question/Comment";
import CommentAdd from "../question/CommentAdd";
import CloseIcon from "@mui/icons-material/Close";

export default function CommentModal({
  question,
  theme,
  setCommentToggle,
  commentToggle,
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setCommentToggle(false);
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick} isVisible={commentToggle}>
      <ModalContainer isVisible={commentToggle}>
        <CloseButton onClick={() => setCommentToggle(false)}>
          <CloseIcon />
        </CloseButton>
        <CommentsContainer>
          {question?.comments?.map((comment) => (
            <Comment
              key={comment._id}
              questionData={question}
              comment={comment}
              theme={theme}
            />
          ))}
        </CommentsContainer>
        <CommentAddContainer>
          <CommentAdd questionData={question} theme={theme} />
        </CommentAddContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: visibility 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background: var(--background-color);
  width: 100%;
  height: 50%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  animation: ${(props) => (props.isVisible ? slideUp : slideDown)} 0.3s ease-out;
`;

const CommentsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  cursor: pointer;
  margin-bottom: 0.5rem;
`;

const CommentAddContainer = styled.div`
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;
