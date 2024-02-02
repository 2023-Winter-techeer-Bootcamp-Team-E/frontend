import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { baseInstance } from '../api/config';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import DHomeButton from '../components/DiaryPage/DHomeButton';
import InnerImg from '../components/DiaryPage/InnerImg';
import { useSelectDateInfoStore } from '../stores/useSelectDateInfoStore';
import useDiaryIdStore from '../stores/useDiaryIdStore';
import SmallSketchbook from './../components/SmallSketchbook';

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
          console.log('일기장 확인 실패');
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
        <WrapperSmallSketchbook>
          <SmallSketchbook />
        </WrapperSmallSketchbook>
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
const WrapperSmallSketchbook = styled.div`
  position: absolute;
  top: 7.9375rem;
`;

const WrapperDHomeButton = styled.div`
  position: absolute;
  right: 5.19rem;
  bottom: 5.4rem;
  display: flex;
  z-index: 10;
`;

const WrapperInnerImg = styled.div`
  position: absolute;
  top: 0;
  left: 22.7rem;
`;

export default PastPage;
