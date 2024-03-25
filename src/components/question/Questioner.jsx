import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Questioner() {
  return (
    <QuestionerContainer>
      <QuestionerProfileIcon>
        <AccountCircleIcon sx={{ fontSize: "3rem" }} />
      </QuestionerProfileIcon>
      <QuestionerProfileContainer>
        <QuestionerProfileName>오준영</QuestionerProfileName>
        <QuestionerDate>03/25 10:00</QuestionerDate>
      </QuestionerProfileContainer>
    </QuestionerContainer>
  );
}

//-----------질문자 상단 부분-------------
//질문자의 칸
const QuestionerContainer = styled.div`
  display: flex;
  padding: 1.5rem;
`;

//질문자 프로필 상단
const QuestionerProfileContainer = styled.div``;

//질문자 프로필 아이콘
const QuestionerProfileIcon = styled.div`
  color: #f2d492;
  padding-right: 0.3rem;
`;

//질문자 이름
const QuestionerProfileName = styled.div`
  font-size: 1.2rem;
`;

//질문 작성 날짜
const QuestionerDate = styled.div`
  font-size: 0.8rem;
`;
