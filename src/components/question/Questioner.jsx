import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

export default function Questioner({ questionData }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const isCurrentUser = questionData?.questionerId === currentUserId;

  const navigate = useNavigate(); // For navigation after delete
  const handleEdit = () => {
    console.log("Edit Question");
    // 수정 로직 구현
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/questions/${questionData.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("질문이 성공적으로 삭제가 되었습니다.");
          navigate(-1); // Redirect to home or wherever makes sense in your app
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
          `http://localhost:4000/api/questions/${questionData.id}/report`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          alert("질문이 신고가 되었습니다.");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (error) {
        alert(`Failed to report question: ${error.message}`);
      }
    }
  };

  //사용자 인증
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("http://localhost:4000/api/user/info", {
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
    <QuestionerContainer>
      <QuestionerProfileContainer>
        <QuestionerProfileIcon>
          {questionData?.profilePictureUrl ? (
            <img
              src={questionData.profilePictureUrl}
              alt="Profile"
              style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} // 이미지를 원형으로 표시
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: "3rem" }} />
          )}
        </QuestionerProfileIcon>

        <div>
          <QuestionerProfileName>
            {questionData?.questionerName}
          </QuestionerProfileName>
          <QuestionerDate>{questionData?.date}</QuestionerDate>
        </div>
      </QuestionerProfileContainer>
      <ButtonContainer>
        {isCurrentUser ? (
          <>
            <Button onClick={handleEdit}>수정</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </>
        ) : (
          <Button onClick={handleReport}>신고</Button>
        )}
      </ButtonContainer>
    </QuestionerContainer>
  );
}

//-----------질문자 상단 부분-------------
//질문자의 칸
const QuestionerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
`;

//질문자 프로필 상단
const QuestionerProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

//질문자 프로필 아이콘
const QuestionerProfileIcon = styled.div`
  color: #f2d492;
  padding-right: 0.3rem;
`;

//질문자 이름
const QuestionerProfileName = styled.div`
  font-size: 1.2rem;
`;

//질문 작성 날짜
const QuestionerDate = styled.div`
  font-size: 0.8rem;
`;
// 신고 및 삭제 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// 버튼 공통 스타일
const Button = styled.button`
  width: 3rem;
  height: 2rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 0.5rem;
  font-weight: bold;
  background-color: #f2d492; // 밝은 색상
  color: #333;
  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;
