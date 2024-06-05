import React from "react";
import styled from "styled-components";

//모든 박스 틀
const MonthBox = styled.div`
  display: flex;
  min-height: 6rem;
  line-height: 150%;
  width: 100%;
  color: var(--foreground-color);
  justify-content: center;
  align-items: center;
`;

//현재 달
const CurrentMonthBox = styled.span`
  display: flex;
  font-size: 2rem;
  width: 5rem;
  font-weight: 700;
  align-items: center;
  flex-direction: column;
  font-family: "Noto Sans KR";
`;

// //현재 년도
const CurrentYearBox = styled.div`
  display: flex;
  margin-top : -2rem;
  font-size: 1.2rem;
  color : var(--foreground-color);
  font-weight: 500;
  line-height: 150%;
`;

//다른 달
const OtherMonthBox = styled.span`
  display: flex;
  font-size: 1.5rem;
  font-weight: 500;
  width: 4rem;
  justify-content: center;
`;

const StyledArrow = styled.svg`
  cursor: pointer;
  transition: fill 0.3s;
  &:hover {
    fill: #fafafa;
  }
`;

const Arrow = styled.div`
  display: flex;
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 1rem;
  justify-content: center;
`;
// 왼쪽 화살표
const BeforeMonthArrow = () => (
  <StyledArrow
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g clipPath="url(#clip0_1653_7120)">
      <path
        d="M21 9L12 18L21 27V9Z"
        stroke="var(--foreground-color)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1653_7120">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </StyledArrow>
);

// 오른쪽 화살표
const AfterMonthArrow = () => (
  <StyledArrow
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g clipPath="url(#clip0_1653_7117)">
      <path
        d="M15 27L24 18L15 9V27Z"
        stroke="var(--foreground-color)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1653_7117">
        <rect width="36" height="36" fill="var(--foreground-color)" />
      </clipPath>
    </defs>
  </StyledArrow>
);
const Months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export default function ScheduleMonth({
  currentMonthIndex,
  currentYearIndex,
  handleBeforeMonth,
  handleAfterMonth,
}) {
  const currentMonth = Months[currentMonthIndex]; //현재 달
  const beforeMonth = Months[(currentMonthIndex - 1 + 12) % 12]; //저번 달
  const afterMonth = Months[(currentMonthIndex + 1) % 12]; //다음 달
  return (
    <>
      <MonthBox>
        <OtherMonthBox>{beforeMonth}</OtherMonthBox>
        <Arrow onClick={handleBeforeMonth}>
          <BeforeMonthArrow />
        </Arrow>
        <CurrentMonthBox>{currentMonth}</CurrentMonthBox>
        <Arrow onClick={handleAfterMonth}>
          <AfterMonthArrow />
        </Arrow>
        <OtherMonthBox>{afterMonth}</OtherMonthBox>
      </MonthBox>
      <CurrentYearBox>{currentYearIndex}년</CurrentYearBox>
    </>
  );
}
