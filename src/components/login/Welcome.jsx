import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const WelcomeContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryColor}; 
`;

export default function Welcome({ nickName }) {
  const navigate = useNavigate();

  //useEffect를 사용해서 해당 시간설정 및 타임아웃 정리하기
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/chatlist');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup 함수
  }, [navigate]); // navigate 함수를 의존성 배열에 추가

  return (
    <WelcomeContainer>
      환영합니다, {nickName}님!
    </WelcomeContainer>
  );
}
