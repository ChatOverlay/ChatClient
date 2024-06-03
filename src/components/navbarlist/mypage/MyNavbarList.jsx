import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        <div className="icon__arrow__container">
          <ArrowForwardIcon />
        </div>
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
        <div className="icon__arrow__container">
          <ArrowForwardIcon />
        </div>
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
        <div className="icon__arrow__container">
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  );
}
