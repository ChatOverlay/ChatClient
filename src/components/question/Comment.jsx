import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // 채택 아이콘 추가
import CancelIcon from "@mui/icons-material/Cancel"; // 취소 아이콘 추가

import ModeIcon from "@mui/icons-material/Mode";
import { useSharedState } from "../../context/SharedStateContext";
import {
  CommentContainer,
  CommentHeadContainer,
  CommentProfileContainer,
  AcceptedIndicator,
  CommentProfileIcon,
  CommentProfileName,
  CommentProfileDate,
  CommentContent,
  CommentActions,
  StyledReportIcon,
  StyledDeleteIcon,
  AcceptContainer,
  AcceptButton,
  CommentReplyContainer,
  ReplyInputContainer,
  ReplyInput,
  ReplyButton,
  ReplyButtonContainer,
  ReplyCommentAddIconContainer,
  ReplyInputBox,
} from "./CommentStyle";
import CommentReply from "./CommentReply";

export default function Comment({
  questionData,
  changeData,
  setChangeData,
  comment,
  theme,
}) {
  const [isQuestioner, setIsQuestioner] = useState(false); //질문자 확인용
  const [currentUserId, setCurrentUserId] = useState(null); //접속한 아이디 확인용
  const [isCurrentUser, setIsCurrentUser] = useState(true); // Initially true, update based on fetched data
  const [isItAccepted, setIsItAccepted] = useState(comment.isAccepted);
  const [replying, setReplying] = useState(false); // 대댓글 작성 상태 관리
  const [replyContent, setReplyContent] = useState(""); // 대댓글 내용 관리
  const { addNewData } = useSharedState();
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsQuestioner(data.id === questionData?.questionerId);
        setCurrentUserId(data.id);
        setIsCurrentUser(comment.userId === data.id);
        const acceptedExists = questionData.comments.some(
          (comment) => comment.isAccepted
        );
        setIsItAccepted(acceptedExists);
      } else {
        console.error(data.message);
      }
    };

    fetchUserInfo();
  }, [questionData, comment.userId]);

  const handleReplySubmit = async () => {
    if (window.confirm("대댓글을 추가하시겠습니까?")) {
      if (replyContent.trim()) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/questions/${
              questionData._id
            }/comments/${comment._id}/replies`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ content: replyContent }),
            }
          );
          if (response.ok) {
            const newReply = await response.json();
            setChangeData(!changeData);
            addNewData();
            setReplying(false);
            setReplyContent("");
          } else {
            const data = await response.json();
            console.error("Failed to add reply:", data.message);
          }
        } catch (error) {
          console.error("Error adding reply:", error);
        }
      } else {
        alert("대댓글 내용을 입력하세요.");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/comments/${comment._id}`,
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
          addNewData();
        } else {
          console.error("Failed to delete the comment.");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };
  const handleReport = async () => {
    if (window.confirm("이 댓글을 신고하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/comments/${comment._id}/report`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("댓글이 정상적으로 신고되었습니다.");
        } else if (response.status === 409) {
          alert("이미 이 댓글을 신고하셨습니다.");
        } else {
          console.error("Failed to report the comment.");
          alert("댓글 신고에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error reporting comment:", error);
        alert("댓글 신고 중 오류가 발생했습니다.");
      }
    }
  };
  

  const handleAccept = async () => {
    if (window.confirm("이 댓글을 채택하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/comments/${comment._id}/accept`,
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
      <CommentHeadContainer>
        <div style={{ color: theme.primaryColor }}>
          <CommentProfileContainer>
            <CommentProfileIcon>
              {comment.commenterProfilePictureUrl ? (
                <img
                  src={comment.commenterProfilePictureUrl}
                  alt="Profile"
                  style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              )}
            </CommentProfileIcon>
            <div>
              <CommentProfileName>
                {comment.commenterName}
                {comment.isAccepted && (
                  <AcceptedIndicator>
                    채택됨
                    <CheckCircleIcon sx={{ marginTop: "0.1rem" }} />
                  </AcceptedIndicator>
                )}
              </CommentProfileName>
              <CommentProfileDate>{comment.date}</CommentProfileDate>
            </div>
            <AcceptContainer>
              {isQuestioner &&
                !isItAccepted && // 채택된 댓글이 없는 경우에만 표시
                currentUserId !== comment.userId && ( // 자기 자신의 댓글이 아닌 경우에만 채택 버튼 표시
                  <AcceptButton onClick={handleAccept}>채택</AcceptButton>
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
      </CommentHeadContainer>
      <ReplyButton onClick={() => setReplying(true)}>답글 달기</ReplyButton>
      {comment.replies?.map((reply, index) => (
        <CommentReplyContainer key={index}>
          <CommentReply
            questionData={questionData}
            comment={comment}
            reply={reply}
            theme={theme}
            currentUserId={currentUserId}
            changeData={changeData}
            setChangeData={setChangeData}
          />
          <ReplyButton onClick={() => setReplying(true)}>답글 달기</ReplyButton>
        </CommentReplyContainer>
      ))}
      {replying && (
        <ReplyInputBox>
          <ReplyInputContainer>
            <ReplyInput
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
              placeholder="대댓글 내용을 입력하세요."
            />
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <ReplyCommentAddIconContainer
                onClick={handleReplySubmit}
                disabled={!replyContent.trim()}
              >
                <ModeIcon sx={{ fontSize: "1.5rem", maxHeight: "100%" }} />
              </ReplyCommentAddIconContainer>
            </div>
          </ReplyInputContainer>
          <ReplyButton
            style={{ margin: " 0.1rem 0 0 0.3rem" }}
            onClick={() => setReplying(false)}
          >
            취소
          </ReplyButton>
        </ReplyInputBox>
      )}
    </CommentContainer>
  );
}
