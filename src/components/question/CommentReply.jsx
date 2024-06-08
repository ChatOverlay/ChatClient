import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSharedState } from "../../context/SharedStateContext";
import {
  CommentReplyHeadContainer,
  CommentProfileContainer,
  CommentProfileIcon,
  CommentProfileName,
  CommentProfileDate,
  CommentContent,
  CommentActions,
  StyledReportIcon,
  StyledDeleteIcon,
} from "./CommentStyle";

export default function CommentReply({ questionData, comment, reply, theme, currentUserId ,changeData,setChangeData }) {
    const [isCurrentUser, setIsCurrentUser] = useState(true);
    const { addNewData } = useSharedState();
  
    //대댓글 자기 자신인지 여부 확인
    useEffect(() => {
      if (currentUserId) {
        setIsCurrentUser(reply.userId === currentUserId);
      }
    }, [currentUserId, reply.userId]);

  const handleDelete = async () => {
    if (window.confirm("대댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/comments/${comment._id}/replies/${reply._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("대댓글이 정상적으로 삭제가 되었습니다.");
          setChangeData(!changeData);
          addNewData();
        } else {
          console.error("Failed to delete the reply.");
        }
      } catch (error) {
        console.error("Error deleting reply:", error);
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm("이 대댓글을 신고하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/comments/${comment._id}/replies/${reply._id}/report`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("대댓글이 정상적으로 신고되었습니다.");
        } else if (response.status === 409) {
          alert("이미 이 대댓글을 신고하셨습니다.");
        } else {
          console.error("Failed to report the reply.");
          alert("대댓글 신고에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error reporting reply:", error);
        alert("대댓글 신고 중 오류가 발생했습니다.");
      }
    }
  };
  

  return (
    <>
      <CommentReplyHeadContainer>
        <div style={{ color: theme.primaryColor }}>
          <CommentProfileContainer>
            <CommentProfileIcon>
              {reply.commenterProfilePictureUrl ? (
                <img
                  src={reply.commenterProfilePictureUrl}
                  alt="Profile"
                  style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              )}
            </CommentProfileIcon>
            <div>
              <CommentProfileName>{reply.commenterName}</CommentProfileName>
              <CommentProfileDate>{reply.date}</CommentProfileDate>
            </div>
          </CommentProfileContainer>
          <CommentContent>{reply.content}</CommentContent>
        </div>
        <CommentActions>
          {isCurrentUser ? (
            <StyledDeleteIcon onClick={handleDelete} />
          ) : (
            <StyledReportIcon onClick={handleReport} />
          )}
        </CommentActions>
      </CommentReplyHeadContainer>
    </>
  );
}
