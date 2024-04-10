import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../ListBox.css";
export default function MyNavbarList({ mileage, totalMileage, setLikedPages }) {
  const [selectedNavItem, setSelectedNavItem] = useState(""); // Added state to track selected navbar item

  const navigate = useNavigate();
  return (
    <div>
      <div
        className={`navbar__list__item ${
          selectedNavItem === "mileage" ? "selected" : ""
        }`} // Conditionally apply the .selected class
        onClick={() => {
          navigate("/mypage/mileage", {
            state: { mileage, totalMileage },
          });
          setSelectedNavItem("mileage"); // Update selectedNavItem state
        }}
      >
        하루 마일리지: {mileage} / 100
        <IconContainer>
          <ArrowForwardIcon />
        </IconContainer>
      </div>
      <div
        className={`navbar__list__item ${
          selectedNavItem === "adoptedpoint" ? "selected" : ""
        }`}
        onClick={() => {
          navigate("/mypage/adoptedpoint");
          setSelectedNavItem("adoptedpoint");
        }}
      >
        채택 포인트
        <IconContainer>
          <ArrowForwardIcon />
        </IconContainer>
      </div>

      <div
        className={`navbar__list__item ${
          selectedNavItem === "likedPages" ? "selected" : ""
        }`}
        onClick={() => {
          setLikedPages(true);
          setSelectedNavItem("likedPages");
        }}
      >
        좋아요 누른 게시글
        <IconContainer>
          <ArrowForwardIcon />
        </IconContainer>
      </div>
    </div>
  );
}

//아이콘 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  color: #f2d492;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;
