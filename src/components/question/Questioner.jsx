import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Questioner({ questionData, theme }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const isCurrentUser = questionData?.questionerId === currentUserId;

  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("Edit Question");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("질문이 성공적으로 삭제되었습니다.");
          navigate(-1);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        alert(`Failed to delete question: ${error.message}`);
      }
    }
  };

  const handleReport = async () => {
    if (window.confirm("이 질문을 신고하시겠습니까?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions/${questionData.id}/report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("질문이 신고되었습니다.");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        alert(`Failed to report question: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUserId(data.id);
      } else {
        console.error(data.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <QuestionerContainer theme={theme}>
      <QuestionerProfileContainer>
        <QuestionerProfileIcon theme={theme}>
          {questionData?.profilePictureUrl ? (
            <img
              src={questionData.profilePictureUrl}
              alt="Profile"
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "3rem", color: theme.foreground }} />
          )}
        </QuestionerProfileIcon>
        <div>
          <QuestionerProfileName theme={theme}>
            {questionData?.questionerName}
          </QuestionerProfileName>
          <QuestionerDate theme={theme}>{questionData?.date}</QuestionerDate>
        </div>
      </QuestionerProfileContainer>
      <ButtonContainer>
        {isCurrentUser ? (
          <>
            <Button theme={theme} onClick={handleEdit}>수정</Button>
            <Button theme={theme} onClick={handleDelete}>삭제</Button>
          </>
        ) : (
          <Button theme={theme} onClick={handleReport}>신고</Button>
        )}
      </ButtonContainer>
    </QuestionerContainer>
  );
}

// 스타일 컴포넌트
const QuestionerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.background}; // 배경 색상 적용
`;

const QuestionerProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionerProfileIcon = styled.div`
  color: ${({ theme }) => theme.highlight}; // 테마 색상 적용
  padding-right: 0.3rem;
`;

const QuestionerProfileName = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.foreground}; // 테마 색상 적용
`;

const QuestionerDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.foreground}; // 테마 색상 적용
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  width: 3rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.5rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.foreground}; // 버튼 배경색 적용
  color: ${({ theme }) => theme.background}; // 버튼 텍스트 색상 적용
  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
  &:focus {
    outline: none;
  }
`;
