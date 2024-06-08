import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import { styled as muiStyled } from "@mui/system";

// 댓글 컨테이너
export const CommentContainer = styled.div`
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid var(--foreground-color);
  display: flex;
  font-family : "Noto Sans KR";
  flex-direction: column;
`;

// 대댓글 제외 컨테이너
export const CommentHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 댓글 프로필 상단
export const CommentProfileContainer = styled.div`
  display: flex;
`;

// 채택된 댓글을 표시하기 위한 스타일 컴포넌트
export const AcceptedIndicator = styled.div`
  display: flex;
  border: 1px solid var(--foreground-color);
  margin-left: 0.2rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  padding: 0 0.2rem 0.05rem 0.2rem;
  align-items: center;
  background-color: var(--foreground-color);
  color: var(--background-color);
  svg {
    font-size: 0.8rem;
    margin-left: 0.1rem;
  }
`;

// 댓글 프로필
export const CommentProfileIcon = styled.div`
  color: var(--foreground-color);
  padding-right: 0.3rem;
`;

// 댓글 프로필이름
export const CommentProfileName = styled.div`
  display: flex;
  font-weight: 700;
`;

// 댓글 프로필 날짜
export const CommentProfileDate = styled.div`
  font-size: 0.7rem;
  font-weight: normal;
`;

// 댓글 내용
export const CommentContent = styled.div`
  padding-left: 0.2rem;
  font-weight: normal;
`;

// 댓글 수정 및 삭제 옵션
export const CommentActions = styled.div`
  display: flex;
  color: var(--foreground-color);
  gap: 1rem;
`;

export const StyledReportIcon = muiStyled(ReportIcon)({
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out",
  "&:hover": {
    opacity: 0.5,
  },
});

export const StyledDeleteIcon = muiStyled(DeleteIcon)({
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out",
  "&:hover": {
    opacity: 0.5,
  },
});

export const AcceptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  font-weight: 700;
`;

// 채택 버튼 컴포넌트 스타일
export const AcceptButton = styled.button`
  background-color: var(--foreground-color);
  color: var(--background-color);
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  font-family: "Noto Sans KR";
  border-radius: 0.5rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

// 스타일 컴포넌트 추가
// 대댓글 추가 컨테이너
export const CommentReplyContainer = styled.div`
  margin-left: 2rem;
  color : var(--primary-color);
  margin-top : 1rem;
`;
export const CommentReplyHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReplyInputBox = styled.div`
display : flex;
flex-direction: column;
  padding-left : 2rem;
`;

export const ReplyInputContainer = styled.div`
  display: flex;
  margin-top: 0.7rem;
  align-items: center;
`;
export const ReplyButtonContainer = styled.div`
display : flex;
`;
export const ReplyInput = styled.input`
  margin-right: 0.5rem;
  width : 70%;
  padding: 0.5rem;
  font-family: "Noto Sans KR";
  border: 0.1rem solid var(--foreground-color);
  border-radius: 1rem;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: var(--primary-color);
  }
`;

export const ReplyButton = styled.div`
  background-color: var(--background-color);
  color: var(--foreground-color);
  margin: 0.2rem 0 0 0.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: "Noto Sans KR";
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

export const ReplyFinishButton = styled.div`
  background-color: var(--foreground-color);
  color: var(--background-color);
  margin-left: 0.2rem;
  font-size: 0.9rem;
  font-weight : bold;
  padding : 0.rem 0.5rem 0.3rem 0.5rem;
  border-radius : 0.5rem;
  cursor: pointer;

  font-family: "Noto Sans KR";
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

export const ReplyCommentAddIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  min-height: 2rem;
  background-color: var(--foreground-color);
  color: var(--background-color);
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 0.8)};
  }
`;
