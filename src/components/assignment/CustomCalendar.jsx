import React from "react";
import styled from "styled-components";

// 캘린더 컨테이너
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 21.1rem;
  font-size: 1.4rem;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
  height : 27.8rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  font-weight: 500;
`;

// 캘린더 컨테이너 상단 헤더 부분
const CalendarTableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 3.1rem;
  background-color: var(--foreground-color);
  border-radius: 0.8rem 0.8rem 0rem 0rem;
`;

// 캘린더 컨테이너 상단 헤더 부분 텍스트
const CalendarTableHeaderText = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 21.1rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 150%;
  color: var(--background-color);
  justify-content: center;
  align-items: center;
`;

// 일별로 나뉠 때 사용되는 | 라인
const CalendarTableHeaderLine = styled.div`
  width: 0.1rem;
  height: 1.6rem;
  background-color: var(--background-color);
`;

// 캘린더 바디부분
const CalendarTable = styled.div`
  display: flex;
  max-width: 100%;
  margin-top: 0.7rem;
  flex-direction: column;
  border: 0.1rem solid var(--primary-color);
  border-top: none;
  flex-wrap : wrap;
`;

// 캘린더 바디 부분 내 작은 상자(변경 시 조정하기)
const CalendarTableBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 3rem;
  height: 4rem;
  flex-direction: column;
  background-color: var(--secondary-color);
  border-right: 0.1rem solid var(--primary-color);
  border-top : 0.1rem solid var(--primary-color);
`;

// 캘린더 바디 부분 내 작은 상자안에 날짜
const CalendarTableBoxDate = styled.div`
  display: flex;
  width: 0.6rem;
  height: 0.6rem;
  justify-content: center;
  align-items: center;
  margin: 0.2rem 0 0 0.2rem;
  border-radius: 4.6rem;
  padding: 0.1rem 0.1rem 0.18rem 0.1rem;
  font-size: 0.8rem;
  background-color: ${(props) =>
    props.$todaydate ? "var(--foreground-color)" : "transparent"};
  color: ${(props) => {
    if (props.$todaydate) return "var(--background-color)";
    if (props.$othermonthstyle) return"grey"; // 이전 달의 첫,마지막 주
    return "var(--primary-color)"; // 현재 달의 날짜
  }};
`;

// 캘린더 바디 부분 내 작은 상자안에 디테일 박스
const CalendarTableBoxDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// 캘린더 바디 부분 내 작은 상자안에 디테일 박스 안에 줄
const CalendarTableBoxDetailLine = styled.div`
  width: 110%;
  height: 0.4rem;
  background-color: ${(props) => props.color};
`;

export default function CustomCalendar({
  currentMonthIndex,
  currentYearIndex,
  dummyData,
}) {
  const dates = ["일", "월", "화", "수", "목", "금", "토"]; //월~일 설정
  const DateToday = new Date().getDate(); //오늘 당일 날짜
  const currentDate = new Date(); //현재 날짜
  const firstDayOfMonth = new Date(currentYearIndex, currentMonthIndex, 1).getDay();

  const daysInMonth = new Date(currentYearIndex, currentMonthIndex + 1, 0).getDate();
  const prevMonthDays = new Date(currentYearIndex, currentMonthIndex, 0).getDate();

  const days = [];

  // 이전 달의 마지막 주의 날짜들 추가
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push(prevMonthDays - i);
  }

  // 현재 달의 날짜들 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // 다음 달의 첫 주의 날짜들 추가
  const remainingDays = 7 - (days.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    days.push(i);
  }

  // 각 달의 날짜에 해당하는 셀 추가
  const columns = [];
  let cells = [];

  for (let i = 0; i < days.length; i++) {
    // 이전 달의 마지막 주의 날짜 스타일
    let isPrevMonthLastWeek = i < firstDayOfMonth;

    // 다음 달의 첫 주의 날짜 스타일
    let isNextMonthFirstWeek = i >= daysInMonth + firstDayOfMonth;
    if (isNextMonthFirstWeek && i % 7 === 0) {
      //다음 달이 마지막 7줄 다 차지하지 않도록 설정
      break;
    }
    cells.push(
      <CalendarTableBox
        key={`cell-${i}`} //key 값을 i 대신 줄 것이 떠오르지 않아서 i를 줬습니다..
      >
        <CalendarTableBoxDate
          $todaydate={
            days[i] === DateToday &&
            currentYearIndex === currentDate.getFullYear() &&
            currentMonthIndex === currentDate.getMonth() &&
            !(i < firstDayOfMonth || i >= daysInMonth + firstDayOfMonth)
          }
          $othermonthstyle={isPrevMonthLastWeek || isNextMonthFirstWeek}
        >
          {days[i]}
        </CalendarTableBoxDate>
        {dummyData.map((data) => {
          // 날짜 비교 로직 간소화
          const startDate = new Date(data.startYear, data.startMonth - 1, data.startDay);
          const endDate = new Date(data.endYear, data.endMonth - 1, data.endDay);
          const cellDate = new Date(currentYearIndex, currentMonthIndex, days[i]);

          if (cellDate >= startDate && cellDate <= endDate && !isPrevMonthLastWeek && !isNextMonthFirstWeek) {
            return (
              <CalendarTableBoxDetailBox key={data.scheduleId}>
                <CalendarTableBoxDetailLine color={data.scheduleColor} />
              </CalendarTableBoxDetailBox>
            );
          }
          return null;
        })}
      </CalendarTableBox>
    );

    // 한 열에 7개의 행이 모두 차면 새로운 열 시작
    if (cells.length == 7 || i === days.length - 1) {
      columns.push(
        <div
          key={`column-${columns.length}`}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {cells.map((cell, index) => (
            <div key={`cell-${index}`}>{cell}</div>
          ))}
        </div>
      );
      cells = [];
    }
  }

  return (
    <CalendarContainer>
      <CalendarTableHeader>
        {dates.map((date, index) => (
          <React.Fragment key={date}>
            <CalendarTableHeaderText>{date}</CalendarTableHeaderText>
            {index < 6 ? <CalendarTableHeaderLine /> : <></>}
          </React.Fragment>
        ))}
      </CalendarTableHeader>
      <CalendarTable>{columns}</CalendarTable>
    </CalendarContainer>
  );
}
