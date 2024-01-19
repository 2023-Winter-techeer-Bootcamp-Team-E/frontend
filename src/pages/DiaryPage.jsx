import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/DiaryPage/RightSticker';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import SaveButton from '../components/DiaryPage/SaveButton';
import TextButton from '../components/DiaryPage/TextButton';
import NicknameInput from '../components/DiaryPage/NicknameInput';
import TextSave from '../components/DiaryPage/TextSaveButton';
import MainInnerImg1 from '../assets/img/InnerImg/MainInnerImg1.png';
import MainInnerImg2 from '../assets/img/InnerImg/MainInnerImg2.png';
import MainInnerImg3 from '../assets/img/InnerImg/MainInnerImg3.png';
import MainInnerImg4 from '../assets/img/InnerImg/MainInnerImg4.png';
import MainInnerImg5 from '../assets/img/InnerImg/MainInnerImg5.png';
import MainInnerImg6 from '../assets/img/InnerImg/MainInnerImg6.png';
import DiaryInnerPaintingDog from '../assets/img/InnerImg/DiaryInnerPaintingDog.png';
import DiaryInnerPaintingInfo from '../assets/img/InnerImg/DiaryInnerPaintingInfo.png';
import Stickers from '../components/Stickers';
import TextBox from '../components/DiaryPage/TextBox';
//NicknameInput, TextSave는 직관적으로 보기 위해 임의로 나타냄

function DiaryPage({ userName = 'userNameNull', userId = 'userIdNull', move }) {
  const [showTextBox, setShowTextBox] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 120, y: 160 });
  const [selectedSticker, setSelectedSticker] = useState(null);
  const diaryRef = useRef(null);

  const handleDeleteTextBox = () => {
    setShowTextBox(false);
  };

  const handleTextButtonClick = () => {
    setShowTextBox(true);
    setInitialPosition({ x: 120, y: 160 }); // 'Diary' 컴포넌트 내부 위치로 초기화
  };

  const handleStickerSelect = (image) => {
    setSelectedSticker(image); // 선택한 이미지 URL을 상태로 저장
    setInitialPosition({ x: 120, y: 100 });
  };

  const handleDeleteStickers = () => {
    setSelectedSticker(false);
  };

  const [innerPageNum, setInnerPageNum] = useState(2); //속지 ID 설정 여거 수정하면 돼 유진쓰

  const InnerPaperRotate = () => {
    switch (innerPageNum) {
      case 1:
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
      case 2:
        return <InnerPaperImg src={MainInnerImg2} ref={diaryRef} />;
      case 3:
        return <InnerPaperImg src={MainInnerImg3} ref={diaryRef} />;
      case 4:
        return <InnerPaperImg src={MainInnerImg4} ref={diaryRef} />;
      case 5:
        return <InnerPaperImg src={MainInnerImg5} ref={diaryRef} />;
      case 6:
        return <InnerPaperImg src={MainInnerImg6} ref={diaryRef} />;
      default:
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
    }
  };

  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar userName={userName} userId={userId} />
        </WrapperNavigateBar>
        <WrapperLargeSketchbook>
          <LargeSketchbook />
        </WrapperLargeSketchbook>
        <WrapperBasicSticker>
          <BasicSticker />
        </WrapperBasicSticker>
        <DiaryWrapper>
          {InnerPaperRotate()}
          <PaintingDog src={DiaryInnerPaintingDog} />
          <PaintingInfo src={DiaryInnerPaintingInfo} />
        </DiaryWrapper>
        {/* <Diary ref={diaryRef} /> */}
        <WrapperRightSticker>
          <RightSticker />
        </WrapperRightSticker>
        <WrapperDHomeButton>
          <DHomeButton move={move} />
        </WrapperDHomeButton>
        <WrapperSaveButton>
          <SaveButton />
        </WrapperSaveButton>
        ƒ
        <WrapperBasicSticker>
          <BasicSticker onStickerSelect={handleStickerSelect} />
        </WrapperBasicSticker>
        {selectedSticker && (
          <Stickers
            onDelete={handleDeleteStickers}
            image={selectedSticker}
            bounds={diaryRef}
            initialPosition={initialPosition}
          />
        )}
        <TextButton onClick={handleTextButtonClick} />
        {showTextBox && (
          <TextBox
            onDelete={handleDeleteTextBox}
            bounds={diaryRef}
            initialPosition={initialPosition}
          />
        )}
      </PageFrame>
    </BackLayout>
  );
}
const BackLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(to bottom, #c1e3ff 60%, #ffffff);
  justify-content: center;
  align-items: center;
  display: flex;
  overflow-y: hidden;
`;
const PageFrame = styled.div`
  position: absolute;
  width: 108rem;
  height: 70rem;
  display: flex;
  top: 0;
  justify-content: center;
`;
const InnerPaperImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-shrink: 0;
`;

const DiaryWrapper = styled.div`
  position: absolute;
  width: 62.875rem;
  height: 47.66113rem;
  flex-shrink: 0;
  top: 15.62rem;
  flex-shrink: 0;
`;
const Diary = styled.div`
  border-radius: 1.875rem;
  background: #fffee1;
  position: absolute;
  width: 65.0625rem;
  height: 50.875rem;
  top: 14.6rem;
  flex-shrink: 0;
`;
const WrapperNavigateBar = styled.div`
  position: absolute;
`;
const WrapperLargeSketchbook = styled.div`
  position: absolute;
  top: 7.9375rem;
`;
const WrapperBasicSticker = styled.div`
  position: absolute;
  top: 17rem;
  left: 4.56rem;
`;
const WrapperRightSticker = styled.div`
  position: absolute;
  top: 17.87rem;
  margin-left: 84.19rem;
`;

const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 5.19rem;
  bottom: 5.4rem;
  display: flex;
  z-index: 10;
`;

const WrapperSaveButton = styled.div`
  position: absolute;
  right: 8.56rem;
  bottom: 5.31rem;
  display: flex;
  z-index: 10;
`;

//임의의 값_ 위치 이동함
const NicknameInputContainer = styled.div`
  position: absolute;
  left: 34.4375rem;
  top: 32.1875rem;
  display: flex;
  z-index: 10;
`;

const TextSaveContainer = styled.div`
  position: absolute;
  left: 46.4375rem;
  top: 32.3rem;
  display: flex;
  z-index: 10;
`;

const PaintingDog = styled.img`
  position: absolute;
  width: 11.3125rem;
  height: 7.75rem;
  flex-shrink: 0;
  margin-left: 1rem;
  margin-top: 3rem;
`;

const PaintingInfo = styled.img`
  position: absolute;
  width: 14.5rem;
  height: 10.625rem;
  flex-shrink: 0;
  margin-left: 46rem;
  margin-top: 3rem;
`;

export default DiaryPage;
