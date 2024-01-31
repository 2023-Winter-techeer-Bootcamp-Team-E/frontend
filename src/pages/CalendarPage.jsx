import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelectDateInfoStore } from '../stores/useSelectDateInfoStore';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import DateNotification from '../components/CalendarPage/DateNotification';
import Calendar from '../components/CalendarPage/Calendar';

function CalendarPage() {
  const selectedDateInfo = useSelectDateInfoStore((state) => state);
  const [selectedSticker, setSelectedSticker] = useState(null);

  const handleStickerSelect = (image) => {
    setSelectedSticker(image); // 선택한 이미지 URL을 상태로 저장
  };

  return (
    <BackLayout>
      <PageFrame>
        <WrapperNavigateBar>
          <NavigateBar locate={'calendar'} />
        </WrapperNavigateBar>

        <WrapperLargeSketchbook>
          <LargeSketchbook />
        </WrapperLargeSketchbook>

        <WrapperBasicSticker>
          <BasicSticker onStickerSelect={handleStickerSelect} />
        </WrapperBasicSticker>

        <WrapperCalendar>
          <Calendar
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
          />
        </WrapperCalendar>

        <WrapperDateNotification>
          <DateNotification
            diaryMonth={selectedDateInfo.selectedMonth}
            diaryDay={selectedDateInfo.selectedDay}
          />
        </WrapperDateNotification>
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
  width: 110rem;
  height: 70rem;
  justify-content: center;
  align-items: center;
  display: flex;
  top: 0;
  left: 3rem;
`;

const WrapperCalendar = styled.div`
  position: absolute;
  width: 60rem;
  height: 45rem;
  margin-top: 16rem;
  flex-shrink: 0;
  z-index: 2;
  background: #d7d7ef;
  border-radius: 1.5rem;
  top: -1rem;
`;

const WrapperNavigateBar = styled.div`
  position: absolute;
  top: -0.6rem;
`;
const WrapperLargeSketchbook = styled.div`
  position: absolute;
  top: 6.9375rem;
`;
const WrapperBasicSticker = styled.div`
  position: absolute;
  top: 14.5rem;
  left: 4.56rem;
`;
const WrapperDateNotification = styled.div`
  position: absolute;
  top: 14.5rem;
  margin-left: 84.19rem;
`;

export default CalendarPage;
