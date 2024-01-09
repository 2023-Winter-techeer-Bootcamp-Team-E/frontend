import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Calendar from 'react-calendar';
import '../CalendarPage/Ecalendar.css';
import moment from 'moment';

function ReactCalendar() {
  const [value, onChange] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date.getDate() === new Date().getDate()) {
      return 'today';
    }
    return '';
  };


  return (
    <WrapperCalendar>
      <StyledCalendar
        //캘린더 영어로
        locale="en-US"
        //일요일 왼쪽으로 가게
        calendarType="US"
        //"월", "일" 빼기
        formatDay={(locale, date) => date.toLocaleString('en', { day: '2-digit' })}
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
      />
    </WrapperCalendar>
  );
}

const StyledCalendar = styled(Calendar)`
  /* Add any specific styles for the Calendar component here if needed */
`;

const WrapperCalendar = styled.div`

`;

export default ReactCalendar;
