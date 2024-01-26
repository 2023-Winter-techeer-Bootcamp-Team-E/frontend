import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { baseInstance } from '../../api/config';
import { useNavigate } from 'react-router-dom';
import { useDiaryContent } from '../../store/useDiaryContent';

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
  diaryMonth,
  diaryDay,
}) {
  const diaryRef = useRef(null);
  const [innerPage, setInnerPage] = useState(1);
  const navigate = useNavigate();
  const diaryContent = useDiaryContent((state) => state.diaryContent);
  const [contentArr, setContentArr] = useState([]);

  const handleDeleteTextBox = () => {
    setSelectedTextBox(false);
  };

  const handleDeleteStickers = () => {
    setSelectedSticker(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseInstance.get(`/diaries/?day=${diaryDay}`);
        if (true) {
          console.log(`${diaryMonth}월 ${diaryDay}일 다이어리 조회 성공!`);
          const diaryBgId = response.data.diary_bg_id;
          setInnerPage(diaryBgId);

          // diaryContent가 빈 문자열이 아닌 경우에만 추가
          if (diaryContent !== '') {
            setContentArr((prevArr) => [...prevArr, diaryContent]);
          }
        }
        console.log('contentArr :', contentArr);
      } catch (error) {
        console.log(
          `catch ${diaryMonth}월 ${diaryDay}일 다이어리 조회 실패 : ${error.message}`,
        );
        navigate('/calendar');
      }
    };
    fetchData();
    console.log('contentArr :', contentArr);
  }, [diaryContent, contentArr]); // contentArr를 의존성 배열에 추가

  useEffect(() => {
    console.log('contentArr :', contentArr);
  }, [contentArr]); // contentArr가 업데이트될 때마다 실행

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

  return (
    <div>
      <DiaryWrapper>
        <InnerImgWrapper>{InnerPaperRotate()}</InnerImgWrapper>
        <PaintingDog src={DiaryInnerPaintingDog} />
        <PaintingInfo src={DiaryInnerPaintingInfo} />
        {selectedSticker && (
          <Stickers
            onDelete={handleDeleteStickers}
            image={selectedSticker}
            bounds={diaryRef}
          />
        )}
        <DirName>조진우</DirName>
        <DirDate>
          {diaryMonth}월 {diaryDay}일
        </DirDate>
        {selectedTextBox && (
          <TextBox onDelete={handleDeleteTextBox} bounds={diaryRef} />
        )}
        {/* 작업 들어갈 곳 */}
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
const Contents = styled.p`
  color: #000000;
  font-family: 'dachelove';
  font-size: 1rem;
`;
