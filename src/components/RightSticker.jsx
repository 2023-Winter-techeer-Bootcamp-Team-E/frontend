import React from 'react';
import { styled } from 'styled-components';
import Cloud1 from '../../public/img/Cloud1.png';

const RightSticker = () => {
  return (
    <div>
      <RightStickerContainer>
        <StyledCloud1 src="/img/Cloud1.png" alt="Cloud 1" />
        <StyledCloud2 src="/img/Cloud2.png" alt="Cloud 2" />
      </RightStickerContainer>
    </div>
  );
};

export default RightSticker;

const RightStickerContainer = styled.div`
  width: 12rem;
  height: 35rem;
  border-radius: 1.875rem;
  background: #e7eef9;
`;

const StyledCloud1 = styled.img`
  position: absolute;
  width: 7.25rem;
  height: 6rem;
  top: -8%;
  left: 65%;
  transform: translateX(-50%);
  z-index: 10;
`;

const StyledCloud2 = styled.img`
  position: absolute;
  width: 8.25rem;
  height: 6.5rem;
  bottom: -8%;
  left: 15%;
  transform: translateX(-50%);
  z-index: 10;
`;
