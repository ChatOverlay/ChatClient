import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";
import styled from "styled-components";
import ClubContainer from "../../components/club/ClubContainer";
import ClubDetail from "../../components/club/ClubDetail";

export default function Club() {
  const [closeOption, setCloseOption] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [calendarData, setCalendarData] = useState([]);

  useMobileNavigate(closeOption, "/home");

  const handleSelectClub = (club) => {
    setSelectedClub(club);
  };

  const handleSetCalendarData = (data) => {
    setCalendarData(data);
  };

  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="교내 동아리"
        />
        <ClubBox>
          <ClubContainer onSelectClub={handleSelectClub} onSetCalendarData={handleSetCalendarData} />
          <ClubDetail club={selectedClub} calendarData={calendarData} />
        </ClubBox>
      </AppContainer>
    </>
  );
}

const ClubBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  height: 100%;
  flex-wrap: wrap;
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
