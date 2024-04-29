// ProductItem.js
import React from "react";
import styled from "styled-components";

const ProductItem = ({ product,theme }) => {
  return (
    <ItemContainer >
      <ProductName>{product.name}</ProductName>
      <Mileage>{product.mileage} 마일리지</Mileage>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  background-color: var(--foreground-color);
  color: var(--background-color);
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight : bold;
`;

const Mileage = styled.div`
  font-size: 14px;
`;

export default ProductItem;
