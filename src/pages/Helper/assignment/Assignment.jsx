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
    ]);
  const [password, setPassword] = useState("");
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
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

  /*임시 제거
  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/fetchAssignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setDummyData(data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };*/

  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="오늘 내 과제는?"
        />
        <HelperBox>
          <ScheduleMonth
            currentMonthIndex={currentMonthIndex}
            currentYearIndex={currentYearIndex}
            handleBeforeMonth={handleBeforeMonth}
            handleAfterMonth={handleAfterMonth}
          />
          {/* <PasswordInputContainer>
            <PasswordInput
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FetchButton onClick={fetchAssignments}>과제 가져오기</FetchButton>
          </PasswordInputContainer> */}
          <ScheduleContainer>
            <CustomCalendar
              currentMonthIndex={currentMonthIndex}
              currentYearIndex={currentYearIndex}
              colorOptionList={colorOptionList}
              dummyData={dummyData}
            />
            <ScheduleDetail
              currentMonthIndex={currentMonthIndex}
              currentYearIndex={currentYearIndex}
              colorOptionList={colorOptionList}
              dummyData={dummyData}
              title={"진행중"}
            />
            <ScheduleDetail
              currentMonthIndex={currentMonthIndex}
              currentYearIndex={currentYearIndex}
              colorOptionList={colorOptionList}
              dummyData={dummyData}
              title={"제출 완료"}
            />
          </ScheduleContainer>
        </HelperBox>
      </AppContainer>
    </>
  );
}

export const HelperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: "Noto Sans KR";
  color: var(--primary-color);
  background-color: var(--background-color);
  overflow-x: hidden;
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
      display: none;
    }
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    margin-bottom: 5rem;
  }
`;

const PasswordInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const PasswordInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid var(--foreground-color);
  border-radius: 0.5rem;
  font-family: Noto Sans KR;
`;

const FetchButton = styled.button`
  font-size: 1rem;
  margin-left: 0.5rem;
  font-weight : bold;
  
  font-family: Noto Sans KR;
  background-color: var(--foreground-color);
  color: var(--background-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition : 0.2s all ease-in;
  &:hover {
    opacity : 0.6;
  }
`;

// 컬러 옵션 리스트
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
