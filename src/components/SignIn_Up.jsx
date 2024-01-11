import React from 'react';
import styled from 'styled-components';

const SignIn_Up = ({ text, onClick }) => {
  const handleButtonClick = () => {
    onClick(); // 클릭 시 부모 컴포넌트로부터 전달된 함수 호출
  };
  return (
    <MainBtn onClick={handleButtonClick}>
      <PlaceText>{text}</PlaceText>
    </MainBtn>
  );
};

const MainBtn = styled.button`
  width: 36.5625rem;
  height: 4.8125rem;
  border-radius: 1.25rem;
  border: 5px solid #c1e3ff;
  background: #b6defd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceText = styled.p`
  position: absolute;
  color: #fff;
  font-family: Arial Black;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  left: 50%;
  transform: translateX(-50%);
`;

export default SignIn_Up;
