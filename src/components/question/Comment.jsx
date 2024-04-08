import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled as muiStyled } from "@mui/system";
import ReportIcon from "@mui/icons-material/Report";

export default function Comment({
  questionData,
  changeData,
  setChangeData,
  comment,
}) {
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("http://localhost:4000/api/user/info", {
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        // API 호출을 통해 댓글 삭제 요청
        const response = await fetch(
          `http://localhost:4000/api/questions/${questionData.id}/comments/${comment.id}`,
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
  const handleReport = async () => {
    // 사용자에게 신고를 확인받습니다.
    if (window.confirm("이 댓글을 신고하시겠습니까?")) {
      try {
        // 신고 API 호출
        const response = await fetch(
          `http://localhost:4000/api/questions/${questionData.id}/comments/${comment.id}/report`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            // 필요한 경우, 신고에 대한 추가 정보를 body에 포함시킬 수 있습니다.
          }
        );
        if (response.ok) {
          // 신고 성공 시 사용자에게 알립니다.
          alert("댓글이 정상적으로 신고되었습니다.");
        } else {
          console.error("Failed to report the comment.");
        }
      } catch (error) {
        console.error("Error reporting comment:", error);
      }
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
      </div>
      <CommentActions>
      <StyledReportIcon onClick={handleReport} />
      {isCurrentUser && (
        <>
          <StyledDeleteIcon onClick={handleDelete} />
        </>
      )}
      </CommentActions>
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

//댓글 수정 및 삭제 옵션
const CommentActions = styled.div`
  display: flex;
  color: #f2d492;
  gap: 1rem;
`;
const StyledReportIcon = muiStyled(ReportIcon)({
  cursor: 'pointer',
  transition: 'opacity 0.2s ease-in-out', // opacity 변화에 대한 애니메이션 설정
  '&:hover': {
    opacity: 0.7, // hover 시 opacity 감소
  },
});

const StyledDeleteIcon = muiStyled(DeleteIcon)({
  cursor: 'pointer',
  transition: 'opacity 0.2s ease-in-out', // 동일한 애니메이션 설정
  '&:hover': {
    opacity: 0.7, // hover 시 opacity 감소
  },
});
