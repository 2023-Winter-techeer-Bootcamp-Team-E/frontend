import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/DiaryPage/RightSticker';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import SaveButton from '../components/DiaryPage/SaveButton';
import TextButton from '../components/DiaryPage/TextButton';
import InnerImg from '../components/DiaryPage/InnerImg';

function DiaryPage({ userName = 'userNameNull', userId = 'userIdNull', move }) {
  const [selectedTextBox, setSelectedTextBox] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleTextButtonClick = () => {
    setSelectedTextBox(true);
  };
  const handleStickerSelect = (image) => {
    setSelectedSticker(image); // 선택한 이미지 URL을 상태로 저장
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
        <WrapperInnerImg>
          <InnerImg
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
            selectedTextBox={selectedTextBox}
            setSelectedTextBox={setSelectedTextBox}
          />
        </WrapperInnerImg>
        <WrapperRightSticker>
          <RightSticker />
        </WrapperRightSticker>
        <WrapperDHomeButton>
          <DHomeButton move={move} />
        </WrapperDHomeButton>
        <WrapperSaveButton>
          <SaveButton />
        </WrapperSaveButton>
        <WrapperBasicSticker>
          <BasicSticker onStickerSelect={handleStickerSelect} />
        </WrapperBasicSticker>
        <TextButton onClick={handleTextButtonClick} />
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

const WrapperInnerImg = styled.div`
  position: absolute;
  top: 0;
  left: 22.7rem;
`;

export default DiaryPage;
