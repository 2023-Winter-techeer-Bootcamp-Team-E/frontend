import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { baseInstance } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import MainInnerImg1 from '../../assets/img/InnerImg/MainInnerImg1.png';
import MainInnerImg2 from '../../assets/img/InnerImg/MainInnerImg2.png';
import MainInnerImg3 from '../../assets/img/InnerImg/MainInnerImg3.png';
import MainInnerImg4 from '../../assets/img/InnerImg/MainInnerImg4.png';
import MainInnerImg5 from '../../assets/img/InnerImg/MainInnerImg5.png';
import MainInnerImg6 from '../../assets/img/InnerImg/MainInnerImg6.png';
import DiaryInnerPaintingDog from '../../assets/img/InnerImg/DiaryInnerPaintingDog.png';
import DiaryInnerPaintingInfo from '../../assets/img/InnerImg/DiaryInnerPaintingInfo.png';

import Stickers from '../../components/DiaryPage/Stickers';
import TextBox from '../../components/DiaryPage/TextBox';
import DalleSticker from './DalleSticker';
import useStickerStore from '../../stores/stickerStore';
import useTextStore from '../../stores/textStore';
import useDalleStore from '../../stores/dalleStore';

function InnerImg({ websocket, diaryData, diaryId, setHostId }) {
  const diaryRef = useRef(null);
  const [diaryMonth, setDiaryMonth] = useState(0);
  const [diaryDay, setDiaryDay] = useState(0);
  const [hostName, setHostName] = useState('');
  const stickers = useStickerStore((state) => state.stickers);
  const texts = useTextStore((state) => state.texts);
  const dalles = useDalleStore((state) => state.dalles);
  const [innerPage, setInnerPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.get(`/diaries/${diaryId}`);
        if (response.data) {
          const responseMonth = response.data.diary_data.year_month;

          const month = responseMonth.split('-')[1];
          const numericMonth = month.startsWith('0')
            ? parseInt(month[1])
            : parseInt(month);
          setDiaryMonth(numericMonth);

          setDiaryDay(response.data.day);
          console.log(
            `${numericMonth}월 ${response.data.day}일 다이어리 조회 성공!`,
          );
          const diaryBgId = response.data.diary_data.diary_bg_id;
          setInnerPage(diaryBgId);
          setHostName(response.data.nickname);
          setHostId(response.data.login_id);
        }
      } catch (error) {
        console.log(`InnerImg에서 다이어리 조회 실패 : ${error.message}`);
        Swal.fire({
          icon: 'warning',
          title: '잘못된 URL입니다!',
          text: '유효하지 않은 URL이므로 다시 확인해보세요 😢',
          confirmButtonText: '확인',
          allowOutsideClick: false,
        }).then(() => {
          navigate('/');
        });
      }
    };
    fetchData();
  }, []);

  const InnerPaperRotate = () => {
    switch (innerPage) {
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
        return <InnerPaperImg src={MainInnerImg2} ref={diaryRef} />;
    }
  };

  const renderTextBoxes = (textBox) => {
    if (!textBox || textBox.length === 0) {
      return null;
    }
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
  const renderStickers = (sticker) => {
    if (!sticker || sticker.length === 0) {
      return null;
    }
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
          key={sticker.id}
          stickerId={sticker.id}
          image={sticker.image}
          websocket={websocket}
        />
      ))}
      <DirName>{hostName}</DirName>
      <DirDate>
        {diaryMonth}월 {diaryDay}일
      </DirDate>
      {texts.map((text) => (
        <TextBox
          key={text.id}
          textId={text.id}
          bounds={diaryRef}
          websocket={websocket}
          username={hostName}
          diaryMonth={diaryMonth}
          diaryDay={diaryDay}
        />
      ))}
      {dalles.map((dalle) => (
        <DalleSticker
          key={dalle.id}
          dalleId={dalle.id}
          image={dalle.image}
          bounds={diaryRef}
          websocket={websocket}
        />
      ))}
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
  width: 17rem;
  flex-shrink: 0;
  margin-left: 44rem;
  margin-top: 3rem;
`;

const DirName = styled.div`
  position: absolute;
  margin-top: 3.5rem;
  margin-left: 50rem;
  color: #000000;
  font-family: 'dachelove';
  width: 100%;
  font-size: 2rem;
`;

const DirDate = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 6.5rem;
  margin-left: 50rem;
  color: #000000;
  width: 100%;
  font-family: 'dachelove';
  font-size: 2rem;
`;
