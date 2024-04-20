import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled as muiStyled } from "@mui/system";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // 채택 아이콘 추가

export default function Comment({
  questionData,
  changeData,
  setChangeData,
  comment,
  theme
}) {
  const [isQuestioner, setIsQuestioner] = useState(false); //질문자 확인용
  const [currentUserId, setCurrentUserId] = useState(null); //댓글자 확인용
  const isCurrentUser = comment.userId === currentUserId; //댓글자인지 확인
  const [isItAccepted, setIsItAccepted] = useState(comment.isAccepted);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsQuestioner(data.id === questionData?.questionerId);
        setCurrentUserId(data.id);
        const acceptedExists = questionData.comments.some(
          (comment) => comment.isAccepted
        );
        setIsItAccepted(acceptedExists);
      } else {
        console.error(data.message);
      }
    };

    fetchUserInfo();
  }, [questionData]);

  const handleDelete = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        // API 호출을 통해 댓글 삭제 요청
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData._id}/comments/${comment._id}`,
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
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData._id}/comments/${comment._id}/report`,
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
  // 채택 버튼 클릭 핸들러
  const handleAccept = async () => {
    if (window.confirm("이 댓글을 채택하시겠습니까?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData._id}/comments/${comment._id}/accept`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("댓글이 채택되었습니다.");
          setIsItAccepted(true); // 채택 상태 업데이트
          setChangeData(!changeData); // 상태 업데이트하여 UI 새로고침
        } else {
          console.error("Failed to accept the comment.");
        }
      } catch (error) {
        console.error("Error accepting comment:", error);
      }
    }
  };

  return (
    <CommentContainer theme={theme}>
      <div style={{color :theme.primaryColor}}>
        <CommentProfileContainer>
          <CommentProfileIcon theme={theme}>
            {comment.profilePictureUrl ? (
              <img
                src={comment.profilePictureUrl}
                alt="Profile"
                style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
              />
            ) : (
              <AccountCircleIcon style={{ fontSize: "2rem" }} />
            )}
          </CommentProfileIcon>
          <div>
            <CommentProfileName>{comment.name}</CommentProfileName>
            <CommentProfileDate>{comment.date}</CommentProfileDate>
          </div>
          <AcceptContainer>
            {isQuestioner &&
              !isItAccepted && // 채택된 댓글이 없는 경우에만 표시
              currentUserId !== comment.userId && ( // 자기 자신의 댓글이 아닌 경우에만 채택 버튼 표시
                <AcceptButton onClick={handleAccept}>채택</AcceptButton>
              )}
            {comment.isAccepted && (
              <AcceptedIndicator theme={theme}>
                채택됨
                <CheckCircleIcon />
              </AcceptedIndicator> 
            )}
          </AcceptContainer>
        </CommentProfileContainer>
        <CommentContent>{comment.content}</CommentContent>
      </div>
      <CommentActions>
        {isCurrentUser ? (
          <StyledDeleteIcon onClick={handleDelete} />
        ) : (
          <StyledReportIcon onClick={handleReport} />
        )}
      </CommentActions>
    </CommentContainer>
  );
}

//--------------댓글 부분---------------
//댓글 컨테이너
const CommentContainer = styled.div`
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.foreground};
  display: flex;
  justify-content: space-between;
`;

//댓글 프로필 상단
const CommentProfileContainer = styled.div`
  display: flex;
`;

// 채택된 댓글을 표시하기 위한 스타일 컴포넌트
const AcceptedIndicator = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.foreground};

  border-radius: 0.5rem;
  padding: 0.1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.foreground}; // 채택 아이콘과 텍스트 색상
  color: ${({ theme }) => theme.background};
  svg {
    font-size: 1rem;
    margin-left: 0.2rem;
  }
`;
//댓글 프로필
const CommentProfileIcon = styled.div`
  color: ${({ theme }) => theme.foreground};
  padding-right: 0.3rem;
`;

//댓글 프로필이름
const CommentProfileName = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
`;

//댓글 프로필 날짜
const CommentProfileDate = styled.div`
  font-size: 0.7rem;
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
const StyledReportIcon = muiStyled(ReportIcon)({
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out", 
  "&:hover": {
    opacity: 0.5, 
  },
});

const StyledDeleteIcon = muiStyled(DeleteIcon)({
  cursor: "pointer",
  transition: "opacity 0.2s ease-in-out", 
  "&:hover": {
    opacity: 0.5, 
  },
});

const AcceptContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  font-weight: 700;
`;

// 채택 버튼 컴포넌트 스타일
const AcceptButton = styled.button`
  background-color: ${({ theme }) => theme.background}; // 녹색 계열

  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.5rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
