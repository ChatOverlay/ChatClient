import React from 'react';
import styled from 'styled-components';
import CustomCalendar from '../assignment/CustomCalendar';
import { Container } from './Style';

const Title = styled.h2`
  margin: 0;
  margin-bottom: 1rem;
  color: var(--foreground-color);
`;

const DetailItem = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const Link = styled.a`
  color: var(--foreground-color);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ClubDetail({ club, calendarData }) {
  if (!club) {
    return <Container>클럽을 선택하여 세부 정보를 확인하세요.</Container>;
  }

  return (
    <Container style={{ flexDirection: "column"}}>
      <Title>{club.name}</Title>
      <DetailItem>
        <Label>카테고리:</Label> {club.category}
      </DetailItem>
      <DetailItem>
        <Label>회원 수:</Label> {club.members}
      </DetailItem>
      <DetailItem>
        <Label>임원 수:</Label> {club.executives}
      </DetailItem>
      <DetailItem>
        <Label>설명:</Label> {club.description}
      </DetailItem>
      <DetailItem>
        <Label>Instagram:</Label>
        <Link href={club.instagram} target="_blank" rel="noopener noreferrer">
          {club.instagram}
        </Link>
      </DetailItem>
      <DetailItem>
        <Label>모집 기간:</Label>
      </DetailItem>
      <CustomCalendar
        currentMonthIndex={new Date().getMonth()}
        currentYearIndex={new Date().getFullYear()}
        dummyData={calendarData}
      />
    </Container>
  );
}
