import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../ListBox.css";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "../../../context/ThemeContext";

export default function LikedPage({ setLikedPages }) {
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { theme } = useTheme(); // 테마 컨텍스트에서 현재 테마 가져오기
  const navigate = useNavigate();
  const handleQuestionClick = (id) => {
    setSelectedQuestion(id);
    navigate(`/question/${id}`);
  };
  useEffect(() => {
    const fetchLikedPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/liked`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Could not fetch liked posts.");
        }
        const data = await response.json();
        setLikedPosts(data);
      } catch (error) {
        console.error("Error fetching liked posts:", error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div className="navbar__list" style={{ flexDirection: "column" }}>
      <IconContainer
        onClick={() => {
          setLikedPages(false);
        }}
      >
        <ArrowBackIcon />
      </IconContainer>
      <LikedPageDetail theme={theme}>좋아요 누른 게시글</LikedPageDetail>
      {likedPosts.map((post) => (
        <div
          className={`navbar__list__item ${
            post.id === selectedQuestion ? "selected" : ""
          }`}
          key={post.id}
          onClick={() => handleQuestionClick(post.id)}
        >
          <div className="question-container">
            <div className="question-title-container">
              <div>{post.title}</div>
              <div className="question-date">{post.date}</div>
            </div>
            <div className="sub-title-container">{post.className}</div>
          </div>
          <div className="icon__arrow__container">
            <ArrowForwardIcon />
          </div>
        </div>
      ))}
    </div>
  );
}

const IconContainer = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  color: ${({ theme }) => theme.background};
  padding: 1rem;
  &:hover {
    opacity: 0.6;
  }
`;

const LikedPageDetail = styled.div`
  padding-left: 1rem;
  height: 3rem;
  transition: all 0.3s;
  border-bottom: 1px solid ${({ theme }) => theme.foreground};

  animation: slideInFromRight 0.3s ease-out forwards; /* 애니메이션 적용 */
`;
