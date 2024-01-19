import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import MainInnerImg1 from '../../assets/img/InnerImg/MainInnerImg1.png';
import MainInnerImg2 from '../../assets/img/InnerImg/MainInnerImg2.png';
import MainInnerImg3 from '../../assets/img/InnerImg/MainInnerImg3.png';
import MainInnerImg4 from '../../assets/img/InnerImg/MainInnerImg4.png';
import MainInnerImg5 from '../../assets/img/InnerImg/MainInnerImg5.png';
import MainInnerImg6 from '../../assets/img/InnerImg/MainInnerImg6.png';
import DiaryInnerPaintingDog from '../../assets/img/InnerImg/DiaryInnerPaintingDog.png';
import DiaryInnerPaintingInfo from '../../assets/img/InnerImg/DiaryInnerPaintingInfo.png';

import Stickers from '../../components/Stickers';
import TextBox from '../../components/DiaryPage/TextBox';

function InnerImg({
  selectedSticker,
  selectedTextBox,
  setSelectedSticker,
  setSelectedTextBox,
}) {
  const diaryRef = useRef(null);

  const handleDeleteTextBox = () => {
    setSelectedTextBox(false);
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
    <div>
      <DiaryWrapper>
        {InnerPaperRotate()}
        <PaintingDog src={DiaryInnerPaintingDog} />
        <PaintingInfo src={DiaryInnerPaintingInfo} />
        {selectedSticker && (
          <Stickers
            onDelete={handleDeleteStickers}
            image={selectedSticker}
            bounds={diaryRef}
          />
        )}
        {selectedTextBox && (
          <TextBox onDelete={handleDeleteTextBox} bounds={diaryRef} />
        )}
      </DiaryWrapper>
    </div>
  );
}

export default InnerImg;

const DiaryWrapper = styled.div`
  position: absolute;
  width: 62.875rem;
  height: 47.66113rem;
  flex-shrink: 0;
  top: 15.62rem;
  flex-shrink: 0;
`;

const InnerPaperImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-shrink: 0;
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
