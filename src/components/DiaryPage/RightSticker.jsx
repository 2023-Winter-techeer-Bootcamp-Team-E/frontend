import React from 'react';
import { styled } from 'styled-components';
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';

const RightSticker = () => {
  return (
    <div>
      <RightStickerContainer>
        <StyledCloud1 src={Cloud1} alt="Cloud 1" />
        <StyledCloud2 src={Cloud2} alt="Cloud 2" />
      </RightStickerContainer>
    </div>
  );
};

export default RightSticker;

const RightStickerContainer = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
`;

const StyledCloud1 = styled.img`
  position: absolute;
  width: 9.125rem;
  height: 7.5625rem;
  right: 1.0625rem;
  top: -2.9375rem;
  z-index: 10;
`;

const StyledCloud2 = styled.img`
  position: absolute;
  width: 10.5625rem;
  height: 8.4375rem;
  bottom: -3rem;
  left: -4.0625rem;
  z-index: 10;
`;
