import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../context/SharedStateContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function Questioner({
  questionData,
  theme,
  editMode,
  gridMode,
  setEditMode,
}) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const isCurrentUser = questionData?.questionerId === currentUserId;
  const { addNewData } = useSharedState();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("이 질문을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${questionData._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("질문이 성공적으로 삭제되었습니다.");
          addNewData();
          navigate("/home");
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
          `${import.meta.env.VITE_API_URL}/api/questions/${
            questionData._id
          }/report`,
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/info`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCurrentUserId(data.id);
      } else {
        console.error(data.message);
      }
    };

    fetchUserInfo();
  }, []);

  if (currentUserId === null) {
    // Wait until currentUserId is set
    return null;
  }

  return (
    <QuestionerContainer gridMode={gridMode}>
      <QuestionerProfileContainer>
        <QuestionerProfileIcon>
          {questionData?.questionerProfilePictureUrl ? (
            <img
              src={questionData.questionerProfilePictureUrl}
              alt="Profile"
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon
              sx={{ fontSize: "3rem", color: theme.foreground }}
            />
          )}
        </QuestionerProfileIcon>
        <div>
          <QuestionerProfileName gridMode={gridMode}>
            {questionData?.questionerName}
          </QuestionerProfileName>
          <QuestionerDate gridMode={gridMode}>
            {questionData?.date}
          </QuestionerDate>
        </div>
      </QuestionerProfileContainer>
      <ButtonContainer>
        {gridMode ? (
          <IconContainer
            onClick={() => navigate(`/question/${questionData._id}`)}
          >
            <MoreHorizIcon sx={{ fontSize: "2rem" }} />
          </IconContainer>
        ) : isCurrentUser ? (
          <>
            {!editMode && (
              <Button onClick={() => setEditMode(!editMode)}>수정</Button>
            )}
            <Button onClick={handleDelete}>삭제</Button>
          </>
        ) : (
          <Button onClick={handleReport}>신고</Button>
        )}
      </ButtonContainer>
    </QuestionerContainer>
  );
}

// 스타일 컴포넌트
const QuestionerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => (props.gridMode ? "0 1.5rem" : "1.5rem")};
 0 1.5rem;
  padding-top: 4rem;
  color: var(--primary-color); // 텍스트 색상 적용
  font-family: "Noto Sans KR";
`;

const QuestionerProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionerProfileIcon = styled.div`
  padding-right: 0.3rem;
`;

const QuestionerProfileName = styled.div`
  font-size: ${(props) => (props.gridMode ? "1rem" : "1.2rem")};
  font-weight: 700;
`;

const QuestionerDate = styled.div`
  font-size: ${(props) => (props.gridMode ? "0.7rem" : "0.8rem")};
  font-weight: 500;
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
  font-weight: 700;
  font-family: "Noto Sans KR";
  background-color: var(--foreground-color); // 버튼 배경색 적용
  color: var(--background-color); // 버튼 텍스트 색상 적용
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 2rem;
  color: var(--foreground-color);
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;
