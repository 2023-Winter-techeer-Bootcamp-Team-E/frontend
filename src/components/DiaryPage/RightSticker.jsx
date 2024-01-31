// RightSticker
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { baseInstance } from '../../api/config';
import { styled } from 'styled-components';
import Cloud1 from '../../assets/img/Cloud1.png';
import DiaryTutorial from '../../assets/img/DiaryTutorial.png';

import { useDiaryContent } from '../../stores/useDiaryContent';

import loadingLottie from '../../assets/lottie/LottieRunAnimation.json';

const RightSticker = ({ onDalleSelect, websocket }) => {
  const [stickerImages, setStickerImages] = useState([]);
  const diaryContent = useDiaryContent((state) => state.diaryContent);
  const [loading, setLoading] = useState(false);

  const handleDalleClick = (image) => {
    onDalleSelect(image);
    websocket.current.send(
      JSON.stringify({
        type: 'create_dalle',
        image: image,
        position: {
          top2: 100,
          left2: 100,
          width2: 100,
          height2: 100,
          rotate2: 0,
        },
      }),
    );
  };

  useEffect(() => {
    const fetchStickerImages = async () => {
      try {
        if (diaryContent != '') {
          console.log('TextBox에서 저장한 content:', diaryContent);
          console.log('Dall-e 스티커 생성중...');
          setStickerImages([]);
          setLoading(true);
          const response = await baseInstance.post('/diaries/stickers', {
            content: diaryContent,
          }); //1번
          const data = response.data.data;
          setStickerImages(data.sticker_image_urls); //1번

          // const response = await baseInstance.get(`/static/stickers?page=1`); //2번
          // const data = response.data.data;
          // setStickerImages(data.st_image_urls.slice(0, 2)); //2번
          console.log('Dall-e 스티커 생성 완료!');
          useDiaryContent.setState({ diaryContent: '' });
        }
      } catch (error) {
        console.error('Dall-e 스티커 API 호출 에러! :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStickerImages();
  }, [diaryContent]);

  return (
    <div>
      <RightStickerContainer>
        {stickerImages.map((image, index) => (
          <DalleStickerBox key={index} onClick={() => handleDalleClick(image)}>
            <DalleSticker src={image} alt={`Sticker ${index + 1}`} />
          </DalleStickerBox>
        ))}

        {loading && (
          <LoadingOverlay>
            <Lottie
              animationData={loadingLottie}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
            <p style={{ fontSize: '1.5rem' }}>스티커 생성중...</p>
          </LoadingOverlay>
        )}

        <StyledCloud1 src={Cloud1} alt="Cloud 1" />
        {stickerImages == '' && !loading && (
          <DalleStickerBlank>
            <TutorialTheme src={DiaryTutorial} alt="Diary Tutorial" />
            <TutorialComment>
              <RowDiv>
                <WriteBtnModel>작성하기</WriteBtnModel> 버튼을 누르면{' '}
              </RowDiv>
              <>
                텍스트 박스가 생성되고, 작성한 일기 내용과 어울리는 나만의
                스티커를 만들 수 있어요!
              </>
            </TutorialComment>
          </DalleStickerBlank>
        )}
      </RightStickerContainer>
    </div>
  );
};

export default RightSticker;

const RightStickerContainer = styled.div`
  width: 17.45rem;
  height: 42.0625rem;
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
  margin-right: 0.75rem;
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
  right: -2.0625rem;
  top: -2.9375rem;
  z-index: 5;
`;

const DalleStickerBlank = styled.div`
  position: absolute;
  width: 17.45rem;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;
const TutorialTheme = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 17.5rem;
`;
const TutorialComment = styled.p`
  position: absolute;
  font-family: 'mong';
  top: 4.5rem;
  margin: 1.5rem;
  font-size: 1.5rem;
  z-index: 10;
  line-height: 1.375;
`;

const WriteBtnModel = styled.span`
  /* position: relative; */
  font-size: 0.75rem;
  margin-right: 0.375rem;
  margin-top: 0.25rem;
  width: 6.375rem;
  height: 1.5125rem;
  flex-shrink: 0;
  color: #fff;
  font-family: 'bmjua';
  border-radius: 0.85rem;
  background: #c1c3ff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const LoadingOverlay = styled.div`
  width: 70%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
