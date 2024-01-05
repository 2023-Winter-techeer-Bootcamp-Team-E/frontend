// FullModal.jsx
import styled from 'styled-components';
import React from 'react';
import SadLogo from '../../assets/img/SadLogo.png';
import HomeButton from './HomeButton';



function FullModal({ closeModal }) {
  return (
    <FullModalWrapper>
    <FullModalContainer>
      <StyledSadLogo>
        <img src={SadLogo} />
        <div>
          <p>
            제한 인원수 5명을 초과했어요
          </p>
        </div>
      </StyledSadLogo>
      <HomeButton closeModal={closeModal}  />
    </FullModalContainer>
    </FullModalWrapper>
  );
}


const FullModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FullModalContainer = styled.div`
  position: relative;
  width: 49.0625rem;
  height: 35.625rem;
  display: flex;
  flex-shrink: 0;
  border-radius: 1.4375rem;
  background: #F8F8F8;
 justify-content: end; 
 align-items: end;
  
`;

const StyledSadLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 33.16231rem;
  height: 32.9375rem;
  flex-shrink: 0;
  z-index: 5;

  img {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }

  div {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #2C2C2C;
    font-family: 'BMJUA', sans-serif;
    font-size: 1.625rem;
    font-weight: 400;
    z-index: 2;
    width: 80%;
  }
`;



export default FullModal;
