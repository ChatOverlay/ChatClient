import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import { useTheme } from "../../context/ThemeContext";

export default function Adoption() {
  const [classMileages, setClassMileages] = useState([]);
  const [closeOption, setCloseOption] = useState(false);
  const { theme } = useTheme(); // 테마 데이터 사용
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    const fetchClassMileages = async () => {
      try {
        // 예제 URL, 실제 API 엔드포인트로 대체해야 합니다.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userPoints`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch class mileages");
        }
        const data = await response.json();
        setClassMileages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassMileages();
  }, []);
  return (
    <>
      <AppContainer show={closeOption} >
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="채택 포인트"
        />
        <AdoptiveContainer >
          <AdoptiveInfo >채택 포인트</AdoptiveInfo>
        </AdoptiveContainer>
        <ClassContainer >
          {classMileages.length === 0 ? (
            <ClassMileageItem >
              <h3>채택 포인트가 없습니다.</h3>
            </ClassMileageItem>
          ) : (
            classMileages.map((classMileage) => (
              <ClassMileageItem key={classMileage.className} >
                <h3>{classMileage.className}</h3>
                <p>채택 포인트: {classMileage.points}</p>
              </ClassMileageItem>
            ))
          )}
        </ClassContainer>
      </AppContainer>
    </>
  );
}

//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: var(--background-color);
  color: var(--primary-color);
  border-left: 1px solid var(--foreground-color);
  transition: all 0.3s;

  z-index: 1;
`;

const AdoptiveContainer = styled.div`
  padding: 2rem;
  background-color: var(--foreground-color);
  border-bottom: 2px solid var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center; // 내용 중앙 정렬
  gap: 1rem; // 요소 간 간격
`;

const AdoptiveInfo = styled.div`
  font-size: 1.2rem; // 폰트 크기 조정
  color: var(--foreground-color); 
  font-weight: bold; // 글자 두껍게
  padding: 1rem 2rem;
  border-radius: 2rem; // 둥근 모서리
  background-color: var(--background-color); 
  display: inline-block; // 콘텐츠 너비에 맞게 조정
`;

// 상품들을 나열할 컨테이너
const ClassContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열로 나눕니다.
  gap: 2rem; // 그리드 아이템 간의 간격
  padding: 2rem; // 컨테이너 패딩
  @media (max-width: 768px) {
    // 태블릿 및 모바일 화면 대응
    grid-template-columns: repeat(2, 1fr); // 화면이 작을 때는 2열로 변경
  }
  @media (max-width: 480px) {
    // 모바일 화면 대응
    grid-template-columns: 1fr; // 가장 작은 화면에서는 1열로 변경
  }
`;

const ClassMileageItem = styled.div`
  background-color: var(--foreground-color);
  color: var(--background-color);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    opacity: 0.8;
  }
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }
`;
