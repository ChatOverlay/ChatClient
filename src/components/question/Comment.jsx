import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", "room1");

    socket.on("message", (message) => {
      setComments((prevComments) => [...prevComments, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div>
      {comments.map((comment, index) => (
        <CommentContainer key={index}>
          <CommentProfileContainer>
            <CommentProfileIcon>
              <AccountCircleIcon sx={{ fontSize: "2rem" }} />
            </CommentProfileIcon>
            <div>
              <CommentProfileName>{comment.name}</CommentProfileName>
              <CommentProfileDate>{comment.date}</CommentProfileDate>
            </div>
          </CommentProfileContainer>
          <CommentContent>{comment.content}</CommentContent>
        </CommentContainer>
      ))}
    </div>
  );
}

//--------------댓글 부분---------------
//댓글 컨테이너
const CommentContainer = styled.div`
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid #f2d492; 
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
`;

//댓글 내용
const CommentContent = styled.div`
  padding-left: 0.2rem;
`;
