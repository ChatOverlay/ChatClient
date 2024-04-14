import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import ProductItem from "../../components/navbarlist/mypage/ProductItem";
import { useTheme } from "../../context/ThemeContext";

export default function Mileage() {
  const location = useLocation();
  const { theme } = useTheme(); // 테마 데이터 사용
  const mileage = location.state.mileage;
  const totalMileage = location.state.totalMileage;
  const [closeOption, setCloseOption] = useState(false);
  const [products, setProducts] = useState([]); // 상태로 상품 데이터를 관리합니다.
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(5, 10); // Format YYYY-MM-DD
    setTodayDate(formattedDate);
  }, []);
  useEffect(() => {
    // 상품 데이터를 서버에서 가져오는 함수
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        if (!response.ok) {
          throw new Error("서버로부터 상품 데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json(); // 응답 데이터를 JSON으로 파싱
        setProducts(data); // 상태 업데이트
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행합니다.

  return (
    <>
      <AppContainer show={closeOption} theme={theme}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="수업 참여 마일리지"
        />
        <MileageContainer theme={theme}>
          <MileageInfo theme={theme}>
            <div>{todayDate}</div>
            하루 최대 마일리지 : {mileage} / 100
          </MileageInfo>
          <TotalMileage theme={theme}>
            총 마일리지 : {totalMileage}
          </TotalMileage>
        </MileageContainer>
        <ProductsContainer>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} theme={theme} />
          ))}
        </ProductsContainer>
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
  background-color: ${({ theme }) => theme.background};
  color: white;
  border-left: 1px solid ${({ theme }) => theme.foreground};
  transition: all 0.3s;

  z-index: 1;
`;

const MileageContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.foreground}; // 하얀색 배경
  border-bottom: 2px solid ${({ theme }) => theme.background}; // 하단 경계선
  display: flex;
  flex-direction: column;
  align-items: center; // 내용 중앙 정렬
  gap: 1rem; // 요소 간 간격
`;

const MileageInfo = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem; // 폰트 크기 조정
  color: ${({ theme }) => theme.foreground};
  font-weight: bold; // 글자 두껍게
  padding: 1rem 2rem;
  border-radius: 20px; // 둥근 모서리
  background-color: ${({ theme }) => theme.background};
  display: inline-block; // 콘텐츠 너비에 맞게 조정
`;

const TotalMileage = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.background};
`;

// 상품들을 나열할 컨테이너
const ProductsContainer = styled.div`
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
