import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StartButtonClick = (navigate) => {
  navigate('././login');
  console.log('StartButton clicked!');
};

function StartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <StartButtonContainer
      onClick={() => StartButtonClick(navigate)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}>
      <StartMessage>바로 시작하기</StartMessage>
    </StartButtonContainer>
  );
}

const StartButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25.875rem;
  height: 4.625rem;
  border-radius: 1.875rem;
  background-color: #87d5f4;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.15); // 기본 그림자 스타일
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05); // 호버 시 크기 증가
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25); // 호버 시 그림자 강화
  }
`;
const StartMessage = styled.text`
  color: #fff;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  z-index: 10;
`;
export default StartButton;
