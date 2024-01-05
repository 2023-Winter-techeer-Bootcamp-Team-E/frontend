import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import homebutton from '../../assets/img/homebutton.png';



const handleHomeButtonClick = (navigate) => {
  navigate('./login');
  //마이페이지 생기면 경로 바꾸기
  console.log('homebutton clicked!');
  closeModal();
};

function HomeButton({closeModal}) {
  const navigate = useNavigate();

  return (

      <StyledHomeButton
        onClick={() => handleHomeButtonClick(navigate)}
        src={homebutton }
        alt="homebutton"
      />

  );
}

const StyledHomeButton = styled.img`
  padding-right: 2.5rem;
  padding-bottom: 2rem;
  width: 5.3125rem;
  height: 5.3125rem;
  flex-shrink: 0;
  z-index: 10;
  cursor: pointer;
  &:hover {
    transform: scale(1.05); 
  }
`;

export default HomeButton;
