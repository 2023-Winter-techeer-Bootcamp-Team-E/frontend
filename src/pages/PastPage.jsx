import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { baseInstance } from '../api/config';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import InnerImg from '../components/DiaryPage/InnerImg';
import { useSelectDateInfoStore } from '../stores/useSelectDateInfoStore';
import useDiaryIdStore from '../stores/useDiaryIdStore';
import pastSketchbookImg from '../assets/img/pastSketchbook.png';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import pencil from '../assets/img/pencil.png'

function PastPage({ userName = 'userNameNull', userId = 'userIdNull', move }) {
  const [selectedTextBox, setSelectedTextBox] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [diaryData, setDiaryData] = useState(null);
  const {diaryId} = useDiaryIdStore();

  // 사용자가 선택한 날짜 정보 가져오기
  const { selectedMonth, selectedDay, setSelectDateInfo } =
    useSelectDateInfoStore();

  useEffect(() => {
    const readStickers = async () => {
      try {
        const response = await baseInstance.get(`/diaries/${diaryId}`, {
          params: { diary_id: `${diaryId}` },
        });

        if (response.status === 200) {
          setDiaryData(response.data);
          console.log(diaryData);
        } else {
          console.log('일기장 확인 실패');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생 : ', error);

      }
    };

    readStickers();
  }, [selectedMonth, selectedDay]);


  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar userName={userName} userId={userId} />
        </WrapperNavigateBar>
        <SmallSketch>
          <StyledPastSketchbook src={pastSketchbookImg} alt="pastSketchbookImg" />{' '}
          <StyledEmptyLogo2>
            <img src={EmptyLogo2} alt="EmptyLogo2" />
            <div>
              <StyledText>
                하루
                <br />
                연결
              </StyledText>
            </div>
          </StyledEmptyLogo2>
          <Styledpencil src={pencil} alt="pencil"/>
        </SmallSketch>
        <WrapperInnerImg>
          {diaryData && (
            <InnerImg
              diaryData={diaryData}
              selectedSticker={selectedSticker}
              setSelectedSticker={setSelectedSticker}
              selectedTextBox={selectedTextBox}
              setSelectedTextBox={setSelectedTextBox}
            />
          )}
        </WrapperInnerImg>
        <WrapperDHomeButton>
          <DHomeButton />
        </WrapperDHomeButton>
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

const Styledpencil = styled.img`
  position: absolute;
  right: -18.8rem;
  bottom: 22.5rem;
  width: 23.2rem;
  height: 26.8em;
`;

const SmallSketch = styled.div`
  position: absolute;
  top: -1rem;
  bottom: 0;
  z-index: 1;
  border-radius: 1.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const StyledPastSketchbook = styled.img`
  width: 73.25rem;
  height: 60.18063rem;
`;

const StyledEmptyLogo2 = styled.div`
  position: absolute;
  left: 28.8rem;
  top: 2.8em;
  img {
    width: 17.125rem;
    height: 12.25rem;
  }
`;

const StyledText = styled.text`
  position: relative;
  color: #2c2c2c;
  bottom: 7rem;
  left: 5rem;
  font-size: 2.4rem;
  font-family: 'seolleim';
  line-height: 1;
`;
const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 7.19rem;
  bottom: 8.8rem;
  display: flex;
  z-index: 10;
`;

const WrapperInnerImg = styled.div`
  position: absolute;
  top: 0;
  left: 22.7rem;
`;

export default PastPage;
