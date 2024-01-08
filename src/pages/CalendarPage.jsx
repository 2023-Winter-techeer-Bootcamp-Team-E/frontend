import React, { useState } from 'react';
import styled from 'styled-components';
import LargeSketchbook from '../components/LargeSketchbook';
import NavigateBar from '../components/NavigateBar';
import BasicSticker from '../components/BasicSticker';
import RightSticker from '../components/RightSticker';
import WriteDiaryIcon from '../assets/img/WriteDiaryIcon.png';
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
        <Calendar></Calendar>
        <WrapperRightSticker>
          <RightSticker />
        </WrapperRightSticker>
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
const Calendar = styled.div`
  border-radius: 1.875rem;
  background: #fffee1;
  position: absolute;
  width: 60rem;
  height: 40rem;
  top: 18.88rem;
  flex-shrink: 0;
  z-index: 2;
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
export default CalendarPage;
