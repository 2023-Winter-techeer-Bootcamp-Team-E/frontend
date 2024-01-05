import React, { useState } from 'react';
import styled from 'styled-components';
function StartButton() {
  const [isHovered, setIsHovered] = useState(false);
  const StartButtonClick = () => {
    console.log('StartButton clicked!');
  };
  return (
    <StartButtonContainer
      onClick={StartButtonClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}
      // isHovered 상태를 prop으로 전달
    >
      <StartMessage>바로 시작하기</StartMessage>
    </StartButtonContainer>
  );
}
const StartButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20.67em;
  height: 3.7rem;
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
  font-family: Arial Black;
  font-size: 1.2rem;
  font-weight: 900;
  z-index: 10;
`;
export default StartButton;
