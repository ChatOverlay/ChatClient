import React, { useState } from "react";
import {
  Container,
  Sidebar,
  MainContent,
  SectionButtons,
  SelectedSections,
  SectionText,
  SubSectionText,
  SelectedSectionBox,
  CloseButton,
  ClubList,
  ClubItem,
  ResetButton,
  SelectedSectionsContainer,
} from "./Style";

const clubs = [
  {
    name: "밴드 동아리",
    category: "음악-밴드",
    members: 50,
    executives: 5,
    description: "음악 애호가들을 위한 밴드 동아리입니다.",
    recruitmentStart: "2023-06-01",
    recruitmentEnd: "2023-06-05",
    instagram: "https://instagram.com/musicbandclub",
  },
  {
    name: "댄스 동아리",
    category: "음악-댄스",
    members: 30,
    executives: 3,
    description: "음악 애호가들을 위한 댄스 동아리입니다.",
    recruitmentStart: "2023-07-01",
    recruitmentEnd: "2023-07-10",
    instagram: "https://instagram.com/musicdanceclub",
  },
  {
    name: "오케스트라 동아리",
    category: "음악-오케스트라",
    members: 25,
    executives: 4,
    description: "음악 애호가들을 위한 오케스트라 동아리입니다.",
    recruitmentStart: "2023-06-15",
    recruitmentEnd: "2023-06-20",
    instagram: "https://instagram.com/orchestraclub",
  },
  {
    name: "축구 동아리",
    category: "스포츠-축구",
    members: 40,
    executives: 4,
    description: "축구를 좋아하는 사람들을 위한 동아리입니다.",
    recruitmentStart: "2023-08-01",
    recruitmentEnd: "2023-08-05",
    instagram: "https://instagram.com/footballclub",
  },
  {
    name: "농구 동아리",
    category: "스포츠-농구",
    members: 20,
    executives: 2,
    description: "농구를 좋아하는 사람들을 위한 동아리입니다.",
    recruitmentStart: "2023-09-01",
    recruitmentEnd: "2023-09-05",
    instagram: "https://instagram.com/basketballclub",
  },
  {
    name: "미술 동아리",
    category: "예술-미술",
    members: 35,
    executives: 4,
    description: "미술을 사랑하는 사람들을 위한 동아리입니다.",
    recruitmentStart: "2023-05-01",
    recruitmentEnd: "2023-05-05",
    instagram: "https://instagram.com/artclub",
  },
  {
    name: "연극 동아리",
    category: "예술-연극",
    members: 28,
    executives: 3,
    description: "연극을 좋아하는 사람들을 위한 동아리입니다.",
    recruitmentStart: "2023-07-20",
    recruitmentEnd: "2023-07-25",
    instagram: "https://instagram.com/dramaclub",
  },
];

const sections = {
  음악: ["밴드", "댄스", "오케스트라"],
  스포츠: ["축구", "농구"],
  예술: ["미술", "연극"],
};
export default function ClubContainer({ onSelectClub, onSetCalendarData }) {
  const [selectedSections, setSelectedSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const selectSubSection = (mainSection, subSection) => {
    const section = `${mainSection}-${subSection}`;
    if (!selectedSections.includes(section)) {
      const newSelectedSections = [...selectedSections, section];
      setSelectedSections(newSelectedSections);

      const filteredClubs =
        newSelectedSections.length === 0
          ? clubs
          : clubs.filter((club) => newSelectedSections.includes(club.category));
      const calendarData = filteredClubs.map((club) => ({
        scheduleId: club.name,
        scheduleColor: "red",
        startYear: new Date(club.recruitmentStart).getFullYear(),
        startMonth: new Date(club.recruitmentStart).getMonth() + 1,
        startDay: new Date(club.recruitmentStart).getDate(),
        endYear: new Date(club.recruitmentEnd).getFullYear(),
        endMonth: new Date(club.recruitmentEnd).getMonth() + 1,
        endDay: new Date(club.recruitmentEnd).getDate(),
      }));

      onSetCalendarData(calendarData);
    }
  };

  const removeSection = (section) => {
    const newSelectedSections = selectedSections.filter((s) => s !== section);
    setSelectedSections(newSelectedSections);

    const filteredClubs =
      newSelectedSections.length === 0
        ? clubs
        : clubs.filter((club) => newSelectedSections.includes(club.category));
    const calendarData = filteredClubs.map((club) => ({
      scheduleId: club.name,
      scheduleColor: "red",
      startYear: new Date(club.recruitmentStart).getFullYear(),
      startMonth: new Date(club.recruitmentStart).getMonth() + 1,
      startDay: new Date(club.recruitmentStart).getDate(),
      endYear: new Date(club.recruitmentEnd).getFullYear(),
      endMonth: new Date(club.recruitmentEnd).getMonth() + 1,
      endDay: new Date(club.recruitmentEnd).getDate(),
    }));

    onSetCalendarData(calendarData);
  };

  const resetSections = () => {
    setSelectedSections([]);
    onSetCalendarData([]);
  };

  const handleSelectClub = (club) => {
    setSelectedClub(club);
    onSelectClub(club);
  };

  const filteredClubs =
    selectedSections.length === 0
      ? clubs
      : clubs.filter((club) => selectedSections.includes(club.category));

  return (
    <Container>
      <Sidebar>
        <SectionButtons>
          <SectionText onClick={resetSections}>전체</SectionText>
          {Object.keys(sections).map((mainSection) => (
            <div key={mainSection}>
              <SectionText onClick={() => toggleSection(mainSection)}>
                {mainSection}
              </SectionText>
              <div>
                {sections[mainSection].map((subSection) => (
                  <SubSectionText
                    key={subSection}
                    onClick={() => selectSubSection(mainSection, subSection)}
                    expanded={expandedSections.includes(mainSection)}
                  >
                    - {subSection}
                  </SubSectionText>
                ))}
              </div>
            </div>
          ))}
        </SectionButtons>
      </Sidebar>
      <MainContent>
        <SelectedSectionsContainer>
          <SelectedSections>
            {selectedSections.map((section) => (
              <SelectedSectionBox
                key={section}
                onClick={() => removeSection(section)}
              >
                {section}
                <CloseButton>×</CloseButton>
              </SelectedSectionBox>
            ))}
          </SelectedSections>
        </SelectedSectionsContainer>
        <ClubList>
          {filteredClubs.map((club) => (
            <ClubItem
              key={club.name}
              onClick={() => handleSelectClub(club)}
              selected={selectedClub && selectedClub.name === club.name}
            >
              {club.name}
            </ClubItem>
          ))}
        </ClubList>
        <ResetButton onClick={resetSections}>초기화</ResetButton>{" "}
        {/* 위치 변경 */}
      </MainContent>
    </Container>
  );
}
