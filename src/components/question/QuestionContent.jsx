import React from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";

export default function QuestionContent({ questionData }) {
  const commentsCount = questionData?.comments?.length || 0;

  return (
    <Box>
      <Title>{questionData?.title}</Title>
      <Content>{questionData?.content}</Content>
      <IconContainer>
        <div>
          <ThumbUpAltIcon />
        </div>
        <div>
          <ChatIcon /> {commentsCount}
        </div>
      </IconContainer>
      <LikeButton>
      <ThumbUpAltIcon /></LikeButton>
    </Box>
  );
}

//-----------질문 내용 부분-------------
//질문 박스
const Box = styled.div`
  padding: 0.5rem;

  padding-left: 2rem;
  border-bottom: 1px solid #f2d492;
`;

//질문 제목
const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

//질문 내용
const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.8rem;
  padding: 0.2rem;
`;

const IconContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0.2rem;
  gap: 1rem;
  color: #f2d492;
`;

const LikeButton = styled.div`
  display: flex;
  width: 5rem;
  height: 2rem;
  border-radius : 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color : #f2d492;
  margin-left: 0.3rem;
  transition: all 0.3s;
  &:hover{
    background-color : #202c39;
    color : #f2d492;
  }
  
`;
