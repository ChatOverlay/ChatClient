import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import ProductItem from "../../components/navbarlist/mypage/ProductItem";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";

export default function Mileage() {
  const location = useLocation();
  const mileage = location.state.mileage;
  const totalMileage = location.state.totalMileage;
  const [closeOption, setCloseOption] = useState(false);
  const [products, setProducts] = useState([]); // 상태로 상품 데이터를 관리합니다.
  const [todayDate, setTodayDate] = useState("");
  
  useMobileNavigate(closeOption, "/mypage");
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
          `${import.meta.env.VITE_API_URL}/api/products`
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
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="수업 참여 마일리지"
        />
        <MileageContainer>
          <MileageInfo>
            <div>{todayDate}</div>
            하루 최대 마일리지 : {mileage} / 100
          </MileageInfo>
          <TotalMileage>총 마일리지 : {totalMileage}</TotalMileage>
        </MileageContainer>
        <ProductsContainer>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductsContainer>
      </AppContainer>
    </>
  );
}

const MileageContainer = styled.div`
  padding: 2rem;
  background-color: var(--foreground-color); // 하얀색 배경
  border-bottom: 2px solid var(--background-color); // 하단 경계선
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
  color: var(--foreground-color);
  font-weight: bold; // 글자 두껍게
  padding: 1rem 2rem;
  border-radius: 20px; // 둥근 모서리
  background-color: var(--background-color);
  display: inline-block; // 콘텐츠 너비에 맞게 조정
`;

const TotalMileage = styled.div`
  font-size: 1rem;
  color: var(--background-color);
`;

// 상품들을 나열할 컨테이너
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열로 나눕니다.
  gap: 2rem; // 그리드 아이템 간의 간격

  padding: 2rem; // 컨테이너 패딩
  @media (max-width: 480px) {
    // 태블릿 및 모바일 화면 대응
    grid-template-columns: repeat(2, 1fr); // 화면이 작을 때는 2열로 변경
  }
  @media (max-width: 480px) {
    // 모바일 화면 대응
    grid-template-columns: 1fr; // 가장 작은 화면에서는 1열로 변경
  }
`;
