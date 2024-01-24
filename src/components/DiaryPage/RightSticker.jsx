import React, { useState, useEffect } from 'react';
import { baseInstance } from '../../api/config';
import { styled } from 'styled-components';
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';

const RightSticker = () => {
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
  }); // stickerPageNum이 변경될 때마다 useEffect가 실행

  return (
    <div>
      <RightStickerContainer>
        {stickerImages.map((image, index) => (
          <DalleStickerBox
            key={index}
            onClick={() => handleStickerClick(image)}>
            <DalleSticker src={image} alt={`Sticker ${index + 1}`} />
          </DalleStickerBox>
        ))}
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
  background: #4c4c4c;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: stretch;
  justify-content: center;
  position: relative;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
const DalleStickerBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 7.625rem;
  height: 100%;
  z-index: 10;
`;
const DalleSticker = styled.img`
  position: absolute;
  width: 6.5rem;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
  }
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
