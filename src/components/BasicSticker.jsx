import React, { useState, useEffect } from 'react';
import { baseInstance } from '../api/config.js';
import styled from 'styled-components';
import Sun from '../assets/img/Sun.png';
import upbutton from '../assets/img/upbutton.png';
import downbutton from '../assets/img/downbutton.png';

function BasicSticker({ onStickerSelect }) {
  const [stickerPageNum, setStickerPageNum] = useState(1);
  const [stickerImages, setStickerImages] = useState([]);

  const handleStickerClick = (image) => {
    // 여기서 onStickerSelect는 상위 컴포넌트로부터 전달받은 함수입니다.
    onStickerSelect(image);
  };

  useEffect(() => {
    // API 호출 함수
    const fetchStickerImages = async () => {
      try {
        // API 호출 및 데이터 수신
        const response = await baseInstance.get(
          `/static/stickers?page=${stickerPageNum}`,
        );
        const data = response.data.data;

        // 이미지 URL을 상태에 업데이트
        setStickerImages(data.st_image_urls);
      } catch (error) {
        console.error('Error fetching sticker images:', error);
      }
    };

    // 페이지 번호가 변경될 때마다 API 호출
    fetchStickerImages();
  }, [stickerPageNum]); // stickerPageNum이 변경될 때마다 useEffect가 실행

  const handleUpButtonClick = () => {
    if (stickerPageNum > 1) {
      setStickerPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  const handleDownButtonClick = () => {
    if (stickerPageNum < 7) {
      setStickerPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  return (
    <BasicStickerContainer>
      {stickerImages.map((image, index) => (
        <StaticStickerBox key={index} onClick={() => handleStickerClick(image)}>
          <StaticSticker src={image} alt={`Sticker ${index + 1}`} />
        </StaticStickerBox>
      ))}

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  align-items: stretch;
  justify-content: center;
  position: relative;
  padding-top: 5rem;
  padding-bottom: 5rem;
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

const StaticStickerBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 7.625rem;
  height: 100%;
  z-index: 10;
`;

const StaticSticker = styled.img`
  position: absolute;
  width: 6.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }
`;

export default BasicSticker;
