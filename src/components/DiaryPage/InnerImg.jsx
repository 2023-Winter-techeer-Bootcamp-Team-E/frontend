import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { useInnerPage } from '../../store/useInnerPage';

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
import useDiaryStore from '../../stores/diaryStore';

function InnerImg({
  selectedSticker,
  selectedTextBox,
  setSelectedSticker,
  setSelectedTextBox,
  websocket,
}) {
  const { innerPage } = useInnerPage();
  const diaryRef = useRef(null);
  const stickers = useDiaryStore((state) => state.stickers);

  const handleDeleteTextBox = () => {
    setSelectedTextBox(false);
  };

  const handleDeleteStickers = () => {
    setSelectedSticker(false);
  };

  const innerPageNum = useInnerPage.getState().innerPage;

  useEffect(() => {
    useInnerPage.setState({ innerPage: innerPageNum });
  }, [innerPageNum]);

  const InnerPaperRotate = () => {
    switch (innerPageNum) {
      case '1':
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
      case '2':
        return <InnerPaperImg src={MainInnerImg2} ref={diaryRef} />;
      case '3':
        return <InnerPaperImg src={MainInnerImg3} ref={diaryRef} />;
      case '4':
        return <InnerPaperImg src={MainInnerImg4} ref={diaryRef} />;
      case '5':
        return <InnerPaperImg src={MainInnerImg5} ref={diaryRef} />;
      case '6':
        return <InnerPaperImg src={MainInnerImg6} ref={diaryRef} />;
      default:
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
    }
  };

  const renderTextBoxes = () => {
    return diaryData.diaryTextBoxs.map((textBox) => (
      <div
        key={textBox.textbox_id}
        style={{
          position: 'absolute',
          left: `${textBox.xcoor}px`,
          top: `${textBox.ycoor}px`,
          width: `${textBox.width}px`,
          height: `${textBox.height}px`,
          transform: `rotate(${textBox.rotate || 0}deg)`,
        }}>
        {textBox.content}
      </div>
    ));
  };

  // 스티커 렌더링 함수
  const renderStickers = () => {
    return diaryData.diaryStickers.map((sticker) => (
      <img
        key={sticker.sticker_id}
        src={sticker.sticker_image_url}
        alt={`sticker-${sticker.sticker_id}`}
        style={{
          position: 'absolute',
          left: `${sticker.xcoor}px`,
          top: `${sticker.ycoor}px`,
          width: `${sticker.width}px`,
          height: `${sticker.height}px`,
          transform: `rotate(${sticker.rotate || 0}deg)`,
        }}
      />
    ));
  };

  return (
    <DiaryWrapper>
      <InnerImgWrapper>
        {InnerPaperRotate()}
        {diaryData && renderTextBoxes()}
        {diaryData && renderStickers()}
      </InnerImgWrapper>
      <PaintingDog src={DiaryInnerPaintingDog} />
      <PaintingInfo src={DiaryInnerPaintingInfo} />
      {stickers.map((sticker) => (
        <Stickers
          onDelete={handleDeleteStickers}
          key={sticker.id}
          stickerId={sticker.id}
          image={sticker.image}
          bounds={diaryRef}
          websocket={websocket}
        />
      ))}
      {selectedTextBox && (
        <TextBox onDelete={handleDeleteTextBox} bounds={diaryRef} />
      )}
    </DiaryWrapper>
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

const InnerImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  flex-shrink: 0;
`;

const InnerPaperImg = styled.img`
  width: 100%;
  height: 100%;
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
