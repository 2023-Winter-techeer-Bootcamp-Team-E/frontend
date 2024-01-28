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

const MainBtn = styled.div`
  width: 36.5625rem;
  height: 4.8125rem;
  border-radius: 1.25rem;
  background: #b6defd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    /* transform: scale(1.02); */
    background: #a1d6ff;
  }
`;

const PlaceText = styled.p`
  position: absolute;
  color: #fff;
  font-family: 'bmjua';
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  left: 50%;
  transform: translateX(-50%);
`;

export default SignIn_Up;
