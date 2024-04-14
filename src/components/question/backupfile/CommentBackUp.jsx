import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField"; // Import TextField for editing
import Button from "@mui/material/Button"; // Import Button for save changes
import { styled as muiStyled } from '@mui/system';

export default function CommentBackup({
  questionData,
  changeData,
  setChangeData,
  comment,
}) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Add state to manage edit mode
  const [editedContent, setEditedContent] = useState(comment.content); // Add state to store edited comment content
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUserId(data.id);
      } else {
        console.error(data.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = async () => {
    setIsEditMode(true); // 편집 모드 활성화
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        // API 호출을 통해 댓글 삭제 요청
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData.id}/comments/${comment.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("댓글이 정상적으로 삭제가 되었습니다.");

          setChangeData(!changeData);
          // 여기에서 댓글 목록을 새로고침하거나 상태를 업데이트해야 합니다.
        } else {
          console.error("Failed to delete the comment.");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const saveEdit = async () => {
    try {
      // API 호출을 통해 댓글 수정 요청
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/questions/${questionData.id}/comments/${comment.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: editedContent }),
        }
      );
      if (response.ok) {
        setChangeData(!changeData);
        setIsEditMode(false); // 편집 모드 종료
      } else {
        console.error("Failed to save the edited comment.");
      }
    } catch (error) {
      console.error("Error saving the edited comment:", error);
    }
  };

  const isCurrentUser = comment.userId === currentUserId;

  return (
    <CommentContainer>
      <div>
        <CommentProfileContainer>
          <CommentProfileIcon>
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />
          </CommentProfileIcon>
          <div>
            <CommentProfileName>{comment.name}</CommentProfileName>
            <CommentProfileDate>{comment.date}</CommentProfileDate>
          </div>
        </CommentProfileContainer>
        {isEditMode ? (
          <EditContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              label="댓글 수정하기" // 사용자가 편집하는 것임을 명시
            />
            <StyledButton onClick={saveEdit}>Save</StyledButton>
          </EditContainer>
        ) : (
          <CommentContent>{comment.content}</CommentContent>
        )}
      </div>
      {isCurrentUser && !isEditMode && (
        <CommentActions>
          <EditIcon sx={{ cursor: "pointer" }} onClick={handleEdit} />
          <DeleteIcon sx={{ cursor: "pointer" }} onClick={handleDelete} />
        </CommentActions>
      )}
    </CommentContainer>
  );
}

//--------------댓글 부분---------------
//댓글 컨테이너
const CommentContainer = styled.div`
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.background};
  display: flex;
  justify-content: space-between;
`;

//댓글 프로필 상단
const CommentProfileContainer = styled.div`
  display: flex;
`;
//댓글 프로필 상단

//댓글 프로필
const CommentProfileIcon = styled.div`
  color: ${({ theme }) => theme.background};
  padding-right: 0.3rem;
`;

//댓글 프로필이름
const CommentProfileName = styled.div`
  font-size: 0.8rem;
`;

//댓글 프로필 날짜
const CommentProfileDate = styled.div`
  font-size: 0.7rem;
  opacity: 0.6;
`;

//댓글 내용
const CommentContent = styled.div`
  padding-left: 0.2rem;
`;

//댓글 수정 및 삭제 옵션
const CommentActions = styled.div`
  display: flex;
  color: ${({ theme }) => theme.background};
  gap: 1rem;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top : 1rem;
  justify-content: space-between;
`;
// TextField 스타일 커스터마이징
const StyledTextField = muiStyled(TextField)({
  '& .MuiInputBase-input': {
    color: '${({ theme }) => theme.primaryColor}', // 입력 글씨 색상
  },
  '& fieldset': {
    borderColor: '${({ theme }) => theme.background}',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '${({ theme }) => theme.background}',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '${({ theme }) => theme.background}',
    },
  },
  width: '100%',
});

// Button 스타일 커스터마이징
const StyledButton = muiStyled(Button)({
  backgroundColor: '${({ theme }) => theme.background}',
  color: '${({ theme }) => theme.foreground}',
  '&:hover': {
    backgroundColor: '#f2e0bc',
    color: '${({ theme }) => theme.foreground}',
  },
  marginLeft: '0.5rem',
});
