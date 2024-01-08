import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import home from '../../assets/img/home.png';



const handleDHomeButtonClick = (navigate) => {
    navigate('../../login');
    console.log('Dhomebutton clicked!');
    move();
  };
  
  function DHomeButton() {
  
    return (
      <DHomeButtonContainer onClick={() => handleDHomeButtonClick(navigate)}>
        <StyledDHomeButton
          src={home}
          alt="home"
        />
      </DHomeButtonContainer>
    );
  }
  
  const DHomeButtonContainer = styled.div`
  width: 2.625rem;
  height: 2.625rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #C1C3FF;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.05); 
  }
`;

const StyledDHomeButton = styled.img`
    width: 1.75rem;
    height: 1.75rem;
    flex-shrink: 0;
`;

export default DHomeButton;
