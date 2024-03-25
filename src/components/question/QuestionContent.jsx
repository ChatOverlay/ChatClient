import React from "react";
import styled from "styled-components";

export default function QuestionContent() {
  return (
    <Box>
      <Title>할로</Title>
      <Content>다들 반갑습니다.</Content>
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
