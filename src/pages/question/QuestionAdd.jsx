import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import styled from "styled-components";
import SelectLabels from "../../components/navbarlist/select/SelectLabels";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSharedState } from "../../context/SharedStateContext";

export default function QuestionAdd() {
  const [closeOption, setCloseOption] = useState(false);
  const [options, setOptions] = useState("");
  const [title, setTitle] = useState(""); // 질문 제목을 위한 상태
  const [content, setContent] = useState(""); // 질문 내용을 위한 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중인지 여부를 나타내는 상태
  const { addNewData } = useSharedState();
 
  const { theme } = useTheme(); // 테마 컨텍스트에서 현재 테마 가져오기
  const navigate = useNavigate();

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 방지
    // 모든 필드가 입력되었는지 확인
    if (!title.trim() || !content.trim() || !options.trim()) {
      alert('제목, 내용, 옵션을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true); // 제출 시작

    const token = localStorage.getItem('token');
    const questionData = { title, content, options }; // 사용자가 입력한 질문 데이터

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      addNewData();   
      navigate(`/question/${responseData.id}`); // 해당 질문 페이지로 리디렉션
    } catch (error) {
      console.error('Error adding question:', error);
      alert('질문 추가 중 문제가 발생했습니다.');
    } finally {
      setIsSubmitting(false); // 제출 완료
    }
  };

  return (
    <AppContainer show={closeOption} theme={theme}>
      <TopBar
        closeOption={closeOption}
        setCloseOption={setCloseOption}
        titleName="새로운 질문 만들기"
      />
      <QuestionContainer as="form" onSubmit={handleSubmit}>
        <Header>
          <TitleContainer
            placeholder="질문 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <SelectLabels
            options={options}
            setOptions={setOptions}
            location="QuestionAdd"
          />
        </Header>
        <ContentContainer
          placeholder="질문 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SaveButton type="submit" disabled={isSubmitting}>저장</SaveButton>
      </QuestionContainer>
    </AppContainer>
  );
}

// 이하 스타일드 컴포넌트는 생략됩니다...


//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: ${({ theme }) => theme.background};
  border-left: 1px solid ${({ theme }) => theme.background};
  transition: all 0.3s;
  z-index: 1;
`;

//질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: auto; // 높이를 auto로 조정하여 내용에 맞게 유동적으로 변경되도록 합니다.
  color: ${({ theme }) => theme.primaryColor};
  padding: 2rem; // 패딩을 조금 더 늘려 내용이 여유롭게 보이도록 합니다.
  background-color: #2b3e50; // 배경색 추가로 인풋 필드와 대조됩니다.
  border-radius: 8px; // 모서리를 둥글게 처리합니다.
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 그림자 효과를 추가하여 입체감을 줍니다.
  margin: 1rem; 
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; // 여백을 조금 더 늘려주어 시각적으로 여유를 줍니다.
`;

const TitleContainer = styled.input`
  background-color: #2b3e50;
  border: 2px solid ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryColor};
  padding: 1rem;
  border-radius: 4px; // 입력 필드의 모서리를 둥글게 처리합니다.
  width: 40%
  &:focus {
    outline: none;
    border-color: #c9a063; // 포커스 시 테두리 색상 변경을 통해 시각적 피드백을 제공합니다.
  }
`;

const ContentContainer = styled.textarea`
  resize: none;
  background-color: #2b3e50;
  border: 2px solid ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryColor};
  padding: 10px;
  border-radius: 4px;
  margin-top: 1rem; // 타이틀 필드와의 여백을 추가합니다.
  height: 150px; // 콘텐츠 입력 필드의 초기 높이를 지정합니다.
  &:focus {
    outline: none;
    border-color: #c9a063;
  }
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px; // 콘텐츠 입력 필드와의 여백을 추가합니다.
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c9a063; // 호버 시 버튼의 배경색을 변경합니다.
  }
`;

