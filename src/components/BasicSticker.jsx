import React from 'react';
import styled from 'styled-components';
import Sun from '../assets/img/Sun.png';
import upbutton from '../assets/img/upbutton.png';
import downbutton from '../assets/img/downbutton.png';

const BasicSticker = () => {
  const handleUpButtonClick = () => {
    // 버튼이 클릭되었을 때 수행할 작업을 이 함수에 추가하세요
    console.log('UpButton clicked!');
  };

  const handleDownButtonClick = () => {
    // 버튼이 클릭되었을 때 수행할 작업을 이 함수에 추가하세요
    console.log('DownButton clicked!');
  };

  return (
    <BasicStickerContainer>
      <StyledSun src={Sun} alt="Sun" />
      <StyledUpButton
        onClick={handleUpButtonClick}
        src={upbutton}
        alt="UpButton"
      />
      <StyledDownButton
        onClick={handleDownButtonClick}
        src={downbutton}
        alt="DownButton"
      />
      <ScrollContainer />
    </BasicStickerContainer>
  );
};

const BasicStickerContainer = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  text-align: center;
`;

const StyledSun = styled.img`
  position: absolute;
  z-index: 10;
  width: 10.25rem;
  height: 7.0625rem;
  top: -1.9375rem;
  left: -2.6875rem;
`;

const StyledUpButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -3.12356rem;
  left: 6.65625rem;
  cursor: pointer; 
  &:hover {
    transform: scale(1.2); 
  }
`;

const StyledDownButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -4.5rem;
  left: 6.66625rem;

  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const ScrollContainer = styled.div`
  width: 13.25rem;
  height: 3.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: -4.75rem;
  left: 1.1rem;

`;

export default BasicSticker;
