import React, { useState, useEffect } from 'react';
import { baseInstance } from '../../api/config';
import { styled } from 'styled-components';
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';

const RightSticker = () => {
  const [stickerImages, setStickerImages] = useState([]);

  useEffect(() => {
    const fetchStickerImages = async () => {
      try {
        // content 값을 생성
        const content = '너무 배고프다. 초밥 먹으러 가야지!';
        console.log('Dall-e 스티커 생성중...');

        // const response = await baseInstance.post('/diaries/stickers', {
        //   content,
        // });

        const response = await baseInstance.get(`/static/stickers?page=1`);

        const data = response.data.data;

        // API에서 받아온 이미지 URL을 상태에 업데이트
        // setStickerImages(data.sticker_image_urls);
        setStickerImages(data.st_image_urls);

        console.log('Dall-e 스티커 생성 완료!');
      } catch (error) {
        console.error('Dall-e 스티커 API 호출 에러! :', error);
      }
    };

    // 컴포넌트가 마운트될 때 한 번 호출
    fetchStickerImages();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출

  return (
    <div>
      <RightStickerContainer>
        {stickerImages.map((image, index) => (
          <DalleStickerBox key={index}>
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
  background-color: #e7eef9;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center; /* 수직 정렬 중앙 */
  justify-content: center; /* 수평 정렬 중앙 */
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const DalleStickerBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
  z-index: 10;
`;

const DalleSticker = styled.img`
  position: absolute;
  width: 10rem;
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
