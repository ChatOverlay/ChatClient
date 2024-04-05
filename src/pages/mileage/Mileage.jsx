import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import ProductItem from "../../components/navbarlist/mypage/ProductItem";

const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요

export default function Mileage() {
  const [closeOption, setCloseOption] = useState(false);
  const [products, setProducts] = useState([]); // 상태로 상품 데이터를 관리합니다.

  useEffect(() => {
    // 상품 데이터를 서버에서 가져오는 함수
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products"); 
        if (!response.ok) {
          throw new Error('서버로부터 상품 데이터를 가져오는 데 실패했습니다.');
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
          titleName={"마일리지"}
        />
        <ProductsContainer>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
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
  height : 100vh;
  margin-left: ${({ show }) => (show ? "5vw" : "25vw")};
  background-color: #202c39;
  border-left: 1px solid #f2d492;
  transition: all 0.3s;
  z-index: 1;
`;

// 상품들을 나열할 컨테이너
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열로 나눕니다.
  gap: 20px; // 그리드 아이템 간의 간격
  padding: 20px; // 컨테이너 패딩
  @media (max-width: 768px) { // 태블릿 및 모바일 화면 대응
    grid-template-columns: repeat(2, 1fr); // 화면이 작을 때는 2열로 변경
  }
  @media (max-width: 480px) { // 모바일 화면 대응
    grid-template-columns: 1fr; // 가장 작은 화면에서는 1열로 변경
  }
`;