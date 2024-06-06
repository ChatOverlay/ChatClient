import React from "react";
import "./ScheduleDetail.css";
import styled from "styled-components";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from "@mui/icons-material/DoDisturb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const StyledSVG = styled.svg`
  margin: 0.5rem 0 0 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
`;

const CheckIcon = styled(CheckCircleOutlineIcon)`
  margin: 0.3rem 0 0 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  color: #10AD4E;
`;

const XIcon = styled(CancelIcon)`
  margin: 0.3rem 0 0 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  color: red;
`;

export default function ScheduleDetail({
  currentMonthIndex,
  currentYearIndex,
  colorOptionList,
  dummyData,
  title,
}) {
  // DotOptions 배열 구성
  const DotOptions = colorOptionList.map((option) => ({
    value: option.value,
    content: (
      <StyledSVG>
        <circle cx="6" cy="6" r="6" fill={option.value} />
      </StyledSVG>
    ),
  }));

  // 해당 달력에 날짜가 있는지 처리
  const isDataInMonth = dummyData.some(
    (infobox) =>
      ((infobox.startYear == currentYearIndex &&
        infobox.startMonth == currentMonthIndex + 1) ||
        (infobox.endYear == currentYearIndex &&
          infobox.endMonth == currentMonthIndex + 1)) &&
      (infobox.startMonth == currentMonthIndex + 1 ||
        infobox.endMonth == currentMonthIndex + 1 ||
        (infobox.endMonth > currentMonthIndex + 1 &&
          currentMonthIndex + 1 > infobox.startMonth))
  );

  const getIcon = (title) => {
    if (title === "진행중") {
      return <XIcon />;
    } else {
      return <CheckIcon />;
    }
  };

  const getHeaderClass = (title) => {
    if (title === "진행중") {
      return "scheduleheader progress";
    } else{
      return "scheduleheader completed";
    }
  };
  const getBoxClass = (title) => {
    if (title === "진행중") {
      return "schedulebox progress";
    } else {
      return "schedulebox completed";
    }
  };
  return (
    <div className="schedulecontainer">
      <div className={getHeaderClass(title)}>
        {title}
        {getIcon(title)}
      </div>
      {isDataInMonth ? (
        dummyData.map((infobox) =>
          ((infobox.startYear == currentYearIndex &&
            infobox.startMonth == currentMonthIndex + 1) ||
            (infobox.endYear == currentYearIndex &&
              infobox.endMonth == currentMonthIndex + 1)) &&
          (infobox.startMonth == currentMonthIndex + 1 ||
            infobox.endMonth == currentMonthIndex + 1 ||
            (infobox.endMonth > currentMonthIndex + 1 &&
              currentMonthIndex + 1 > infobox.startMonth)) ? (
            <div className={getBoxClass(title)} key={infobox.scheduleId}>
               
              <div className="schduletitlecontainer">
                {
                  DotOptions.find(
                    (option) => option.value === infobox.scheduleColor
                  )?.content
                }
                <div className="scheduletitle">{infobox.title}</div>
              </div>
              <div className="scheduledate">
                {infobox.startMonth}월 {infobox.startDay}일 ~ {infobox.endMonth}
                월 {infobox.endDay}일
                 <ArrowForwardIcon/>
              </div>
              <div className="scheduletext">{infobox.description}</div>
              </div>
          ) : null
        )
      ) : (
        <div className="noschedulebox">과제가 없습니다.</div>
      )}
    </div>
  );
}
