// ProductItem.js
import React from "react";
import styled from "styled-components";

const ProductItem = ({ product,theme }) => {
  return (
    <ItemContainer theme={theme}>
      <ProductName>{product.name}</ProductName>
      <Mileage>{product.mileage} 마일리지</Mileage>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  background-color: ${({ theme }) => theme.foreground};
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
  color: #333;
`;

const Mileage = styled.div`
  font-size: 14px;
  color: #666;
`;

export default ProductItem;
