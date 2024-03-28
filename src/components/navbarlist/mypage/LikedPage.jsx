import React from "react";
import "../ListBox.css";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function LikedPage({ setLikedPages }) {
  return (
    <div className="navbar__list">
      <IconContainer onClick={()=>setLikedPages(false)}>
        <ArrowBackIcon />
      </IconContainer>
      <LikedPageDetail>좋아요 누른 게시글</LikedPageDetail>
    </div>
  );
}
const IconContainer = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  color : #f2d492;
  padding : 1rem;
  &:hover {
    opacity: 0.6;
  }
`;

const LikedPageDetail = styled.div`
  padding-left: 1rem;
  height: 3rem;
  transition: all 0.3s;
  border-bottom: 1px solid #f2d492;

  animation: slideInFromRight 0.3s ease-out forwards; /* 애니메이션 적용 */
`;
