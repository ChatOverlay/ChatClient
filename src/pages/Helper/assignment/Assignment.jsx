import React, { useState } from "react";
import TopBar from "../../../components/topbar/TopBar";
import { AppContainer } from "../../styles";
import useMobileNavigate from "../../../hooks/useMobileNavigate";
import styled from "styled-components";
import CustomCalendar from "../../../components/assignment/CustomCalendar";
import ScheduleDetail from "../../../components/assignment/ScheduleDetail";
import ScheduleMonth from "../../../components/assignment/ScheduleMonth";

export default function Assignment() {
  const [closeOption, setCloseOption] = useState(false);
  useMobileNavigate(closeOption, "/home");

  //해당 날짜 변경하게끔 설정
  const [dummyData, setDummyData] = useState([
    {
      scheduleId: 1,
      title: "Math Assignment",
      startYear: 2024,
      startMonth: 6,
      startDay: 12,
      endYear: 2024,
      endMonth: 6,
      endDay: 17,
      description: "Calgebra.",
      scheduleColor: "#FF7676",
    },
    {
      scheduleId: 2,
      title: "Science Project",
      startYear: 2024,
      startMonth: 6,
      startDay: 16,
      endYear: 2024,
      endMonth: 7,
      endDay: 20,
      description: "ecosystems.",
      scheduleColor: "#70AD4E",
    },
    {
      scheduleId: 3,
      title: "History Presentation",
      startYear: 2024,
      startMonth: 6,
      startDay: 21,
      endYear: 2024,
      endMonth: 6,
      endDay: 25,
      description: " World War II.",
      scheduleColor: "#359AE8",
    },
  ]); const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYearIndex, setCurrentYearIndex] = useState(
    new Date().getFullYear()
  );
  const handleBeforeMonth = () => {
    setCurrentMonthIndex((currentMonthIndex - 1 + 12) % 12);
    setCurrentYearIndex(
      currentMonthIndex === 0 ? currentYearIndex - 1 : currentYearIndex
    );
  };

  const handleAfterMonth = () => {
    setCurrentMonthIndex((currentMonthIndex + 1 + 12) % 12);
    setCurrentYearIndex(
      currentMonthIndex === 11 ? currentYearIndex + 1 : currentYearIndex
    );
  };
  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="오늘 내 과제는?"
        />

        <ScheduleBox>
          <ScheduleMonth
            currentMonthIndex={currentMonthIndex} //현재 달 index값 give
            currentYearIndex={currentYearIndex} //현재 년도
            handleBeforeMonth={handleBeforeMonth} //저번 달 이동 handle 값 get
            handleAfterMonth={handleAfterMonth} //다음 달 이동 handle 값 get
          />
          <ScheduleContainer>
            <CustomCalendar
              currentMonthIndex={currentMonthIndex} //현재 달 index값 give
              currentYearIndex={currentYearIndex} //현재 년도
              colorOptionList={colorOptionList}
              dummyData={dummyData} //해당 데이터 give
            />
            <ScheduleDetail
              currentMonthIndex={currentMonthIndex}
              currentYearIndex={currentYearIndex}
              colorOptionList={colorOptionList}
              dummyData={dummyData}
            />
          </ScheduleContainer>
        </ScheduleBox>
      </AppContainer>
    </>
  );
}

const ScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR";
  color: var(--primary-color);
  background-color : var(--background-color);

  
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--background-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--foreground-color);
    border-radius: 5px;
    border: 2px solid var(--background-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }
  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar on mobile devices */
    }
  }
`;

//캘린더와 일정 추가 부분을 가로로 만들기 위해 생성
const ScheduleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 3rem;
  padding : 1rem;
  gap : 2rem;
  flex-wrap : wrap;
`;

//컬러 옵션 리스트
const colorOptionList = [
  { id: 1, value: "#DCDEEE" },
  { id: 2, value: "#FF7676" },
  { id: 3, value: "#FFA654" },
  { id: 4, value: "#FFE974" },
  { id: 5, value: "#70AD4E" },
  { id: 6, value: "#CCE6F9" },
  { id: 7, value: "#359AE8" },
  { id: 8, value: "#0261AA" },
  { id: 9, value: "#747BBB" },
];
