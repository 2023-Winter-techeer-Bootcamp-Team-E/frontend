import React, { useState, useEffect } from 'react';
import { baseInstance } from '../../api/config';
import { styled } from 'styled-components';
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';
import { useDiaryContent } from '../../store/useDiaryContent';

const RightSticker = () => {
  const [stickerImages, setStickerImages] = useState([]);
  const diaryContent = useDiaryContent((state) => state.diaryContent);
  useEffect(() => {
    console.log('diary content :', diaryContent);
  });
  useEffect(() => {
    const fetchStickerImages = async () => {
      try {
        if (diaryContent != '') {
          console.log('TextBox에서 저장한 content:', diaryContent);
          console.log('Dall-e 스티커 생성중...');

          const response = await baseInstance.post('/diaries/stickers', {
            content: diaryContent,
          }); //1번

          // const response = await baseInstance.get(`/static/stickers?page=1`); //2번

          const data = response.data.data;

          setStickerImages(data.sticker_image_urls); //1번

          // setStickerImages(data.st_image_urls.slice(0, 2)); //2번

          console.log('Dall-e 스티커 생성 완료!');
        }
      } catch (error) {
        console.error('Dall-e 스티커 API 호출 에러! :', error);
      }
    };
    fetchStickerImages();
  }, [diaryContent]);

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
  align-items: center;
  justify-content: center;
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
