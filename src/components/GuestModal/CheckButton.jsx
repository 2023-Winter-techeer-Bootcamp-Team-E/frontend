import React, { useState } from 'react';
import styled from 'styled-components';

function CheckButton({ closeModal, isPasswordValid }) {
  const [isHovered, setIsHovered] = useState(false);

  const CheckButtonClick = () => {
    if (isPasswordValid) {
      console.log('CheckButton clicked!');
      closeModal();
    } else {
      console.log('Invalid Password');
    }
  };

  return (
    <CheckButtonContainer
      onClick={CheckButtonClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      isHovered={isHovered}
      isPasswordValid={isPasswordValid}>
      확인
    </CheckButtonContainer>
  );
}

//확인 버튼
const CheckButtonContainer = styled.div`
  position: absolute;
  width: 8.325rem;
  height: 4.3025rem;
  border-radius: 5rem;
  background: ${(props) => (props.isHovered ? '#B1B3FF' : '#C1C3FF')};
  cursor: ${(props) => (props.isPasswordValid ? 'pointer' : 'not-allowed')};
  cursor: pointer;
  left: 31.75rem;
  top: 15.5rem;
  z-index: 5;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  // 글자 */
  color: #fff;
  font-family: 'Noto Sans';
  font-size: 1.45rem;
  font-weight: 800;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;
export default CheckButton;
