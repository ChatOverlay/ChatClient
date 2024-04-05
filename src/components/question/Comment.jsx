import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField"; // Import TextField for editing
import Button from "@mui/material/Button"; // Import Button for save changes

export default function Comments({ questionData, comment }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Add state to manage edit mode
  const [editedContent, setEditedContent] = useState(comment.content); // Add state to store edited comment content
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch('http://localhost:4000/api/user/info', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
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
        const response = await fetch(`http://localhost:4000/api/questions/${questionData.id}/comments/${comment.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          alert("Comment deleted successfully.");
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
      const response = await fetch(`http://localhost:4000/api/questions/${questionData.id}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: editedContent })
      });
      if (response.ok) {
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
          <>
            <TextField
              fullWidth
              variant="outlined"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <Button onClick={saveEdit}>Save</Button>
          </>
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
  border-bottom: 1px solid #f2d492;
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
  color: #f2d492;
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
  color: #f2d492;
  gap: 1rem;
`;
