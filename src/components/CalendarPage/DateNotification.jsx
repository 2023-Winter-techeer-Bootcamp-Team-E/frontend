import React from 'react';
import { styled } from 'styled-components';
import 'sweetalert2/src/sweetalert2.scss';
import './DateNotification.css';

// 이미지 import
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';
import { useDateNotificationStore } from '../../store/useDateNotificationStore';
import Case1 from './Case1';
import Case2 from './Case2';
import Case3 from './Case3';

// DateNotification 컴포넌트 정의
const DateNotification = ({ diaryMonth, diaryDay }) => {
  const { page, setPage } = useDateNotificationStore();

  return (
    <DateNotificationFrame>
      <StyledCloud1 src={Cloud1} alt="Cloud 1" />
      <StyledCloud2 src={Cloud2} alt="Cloud 2" />
      {page === 1 && <Case1 diaryMonth={diaryMonth} diaryDay={diaryDay} />}
      {page === 2 && <Case2 diaryMonth={diaryMonth} diaryDay={diaryDay} />}
      {page === 3 && <Case3 diaryMonth={diaryMonth} diaryDay={diaryDay} />}
    </DateNotificationFrame>
  );
};

export default DateNotification;

const DateNotificationFrame = styled.div``;
const StyledCloud1 = styled.img`
  position: absolute;
  width: 9.125rem;
  height: 7.5625rem;
  right: 1.0625rem;
  top: -2.9375rem;
  z-index: 10;
`;
const StyledCloud2 = styled.img`
  position: absolute;
  width: 10.5625rem;
  height: 8.4375rem;
  bottom: -3rem;
  left: -4.0625rem;
  z-index: 10;
`;
