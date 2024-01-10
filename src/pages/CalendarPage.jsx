import React from 'react';
import styled from 'styled-components';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import DateNotification from '../components/CalendarPage/DateNotification';
import Calender from '../components/CalendarPage/Calender';

function CalendarPage({ userName = 'userNameNull', userId = 'userIdNull' }) {
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

        <WrapperCalendar>
          <Calender />
        </WrapperCalendar>

        <WrapperDateNotification>
          <DateNotification />
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
  background: #c1e3ff;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const PageFrame = styled.div`
  /* background: #AAAAAA; */
  position: absolute;
  width: 108rem;
  height: 70rem;
  display: flex;
  top: 0;
  justify-content: center;
`;
const WrapperCalendar = styled.div`
  position: absolute;
  width: 60rem;
  height: 45rem;
  margin-top: 17rem;
  flex-shrink: 0;
  z-index: 2;
  background: #D7D7EF;
  border-radius: 1.5rem;
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
const WrapperDateNotification = styled.div`
  position: absolute;
  top: 17.87rem;
  margin-left: 84.19rem;
`;
export default CalendarPage;
