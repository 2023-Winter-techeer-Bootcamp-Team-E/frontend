import React from 'react';
import styled from 'styled-components';
import Sun from '../../public/img/Sun.png';
import upbutton from '../../public/img/upbutton.png';
import downbutton from '../../public/img/downbutton.png';

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
      <StyledSun src="/img/Sun.png" alt="Sun" />
      <StyledUpButton
        onClick={handleUpButtonClick}
        src="/img/upbutton.png"
        alt="UpButton"
      />
      <StyledDownButton
        onClick={handleDownButtonClick}
        src="/img/downbutton.png"
        alt="DownButton"
      />
      <ScrollContainer />
    </BasicStickerContainer>
  );
};

const BasicStickerContainer = styled.div`
  width: 12rem;
  height: 35rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  text-align: center;
`;

const StyledSun = styled.img`
  position: absolute;
  z-index: 10;
  width: 8.25rem;
  height: 5.0625rem;
  top: -10%;
  left: -10%;
`;

const StyledUpButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -8.75%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer; /* 커서를 포인터로 변경하여 클릭 가능함을 나타냄 */
`;

const StyledDownButton = styled.img`
  width: 1.53444rem;
  height: 1.01106rem;
  z-index: 10;
  position: absolute;
  bottom: -12.5%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const ScrollContainer = styled.div`
  width: 11.75rem;
  height: 3.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: -18%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default BasicSticker;
