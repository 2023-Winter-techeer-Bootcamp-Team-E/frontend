import React, { useState, useEffect } from 'react';
import { baseInstance } from '../api/config.js';
import styled from 'styled-components';
import Sun from '../assets/img/Sun.png';
import upbutton from '../assets/img/upbutton.png';
import downbutton from '../assets/img/downbutton.png';

function BasicSticker() {
  const [stickerPageNum, setStickerPageNum] = useState(1);

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
      <StaticStickerBox1>
        <StaticSticker />
      </StaticStickerBox1>

      <StaticStickerBox2>
        <StaticSticker />
      </StaticStickerBox2>

      <StaticStickerBox3>
        <StaticSticker />
      </StaticStickerBox3>

      <StaticStickerBox4>
        <StaticSticker />
      </StaticStickerBox4>

      <StaticStickerBox5>
        <StaticSticker />
      </StaticStickerBox5>

      <StaticStickerBox6>
        <StaticSticker />
      </StaticStickerBox6>

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
}

const BasicStickerContainer = styled.div`
  width: 15.25rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  display: flex;
  align-items: center; /* 수직으로 늘어날 수 있도록 설정 */
  justify-content: center; /* 수평으로 늘어날 수 있도록 설정 */
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

const StaticStickerBox1 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 6rem;
  left: 0;
  background: #ffdada;
  z-index: 10;
`;
const StaticStickerBox2 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 6rem;
  left: 7.625rem;
  background: #ffecda;
  z-index: 10;
`;
const StaticStickerBox3 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 16rem;
  left: 0;
  background: #fcffda;
  z-index: 10;
`;
const StaticStickerBox4 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 16rem;
  left: 7.625rem;
  background: #e4ffda;
  z-index: 10;
`;
const StaticStickerBox5 = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 26rem;
  left: 0rem;
  background: #daedff;
  z-index: 10;
`;
const StaticStickerBox6 = styled.div`
  position: absolute;
  width: 7.625rem;
  height: 10rem;
  top: 26rem;
  left: 7.625rem;
  background: #fedaff;
  z-index: 10;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const StaticSticker = styled.img`
  position: absolute;
  width: 6.5rem;
`;
export default BasicSticker;
