import React from 'react';
import styled from 'styled-components';
import Sun from '../../public/img/Sun.png';

const BasicSticker = () => {
  return (
    <div>
        <BasicStickerContainer>
          <StyledSun src="/img/Sun.png" alt="Sun" />
        </BasicStickerContainer>
    </div>
  );
};

export default BasicSticker;

const BasicStickerContainer = styled.div`
  position: absolute; // 절대 위치 지정
  top: 20%;
  width: 12rem;
  height: 35rem;
  border-radius: 1.875rem;
  background: #E7EEF9;
`;

const StyledSun = styled.img`
  position: absolute; // 절대 위치 지정
  z-index: 10;
  width: 8.25rem;
  height: 5.0625rem;
  top: -10%;
  left: -10%;

  `;