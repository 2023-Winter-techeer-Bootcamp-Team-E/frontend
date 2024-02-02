import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styled from 'styled-components';
import home from '../../assets/img/home.png';

function HomeBtn() {
  const navigate = useNavigate();

  const handleDHomeButtonClick = (navigate) => {
    navigate('/calendar');
    console.log('Dhomebutton clicked!');
  };

  return (
    <DHomeButtonContainer onClick={() => handleDHomeButtonClick(navigate)}>
      <StyledHomeButton src={home} alt="home" />
    </DHomeButtonContainer>
  );
}

const DHomeButtonContainer = styled.div`
  width: 4.125rem;
  height: 4.125rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #c1c3ff;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
    background: #b1b4ff;
  }
`;

const StyledHomeButton = styled.img`
  width: 2.05rem;
  height: 2.05rem;
  flex-shrink: 0;
`;

export default HomeBtn;
