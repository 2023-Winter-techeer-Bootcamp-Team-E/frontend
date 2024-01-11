import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import "./Calendar.css";
import CalendarRightBtn from '../../assets/img/CalendarRightBtn.png'
import CalendarLeftBtn from '../../assets/img/CalendarLeftBtn.png'

// useStore 함수 대신 간단한 상태 저장을 위한 useState 사용
const useSimpleStore = (initialState) => {
  const [state, setState] = useState(initialState);

  const setSimpleState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, setSimpleState];
};

const RenderDays = () => {
  const days = [];
  const date = [
    'SUNDAY',
    'MONDAY',
    'THUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="dayscol" key={i}>
        {date[i]}
      </div>,
    );
  }
  return <div className="days row">{days}</div>;
};

const RenderCells = ({
  currentMonth,
  today,
  list,
  exist,
  selectedDate,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const [add, setAdd] = useState(true);
  const [choiceDate, setChoicedDate] = useSimpleStore(new Date());
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const pageMove = () => {
    setChoicedDate(new Date());
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div
          className={`bodycol cell ${
            !isSameMonth(day, monthStart)
              ? 'not-valid'
              : isSameDay(day, selectedDate)
                ? 'selected'
                : isSameDay(day, today)
                  ? 'today'
                  : format(currentMonth, 'M') !== format(day, 'M')
                    ? 'not-valid'
                    : 'valid'
          }`}
          key={day}
          onClick={() => onDateClick(cloneDay)}>
          <span>
            {formattedDate}
            {Array.isArray(list) &&
              list
                .filter(
                  (x) =>
                    new Date(x.diary_date).toDateString() ===
                    cloneDay.toDateString(),
                )
                .map((data, index) => (
                  <span key={index} className="listemoji">
                    {data.emoji}
                  </span>
                ))}
          </span>
        </div>

      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="bodyrow" key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className="calenderbody">{rows}</div>;
};

const Calender = ({ list, exist }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const today = new Date();
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
    // setChoicedDate(day);  // 사용하지 않는 상태 관리 함수 주석 처리
  };
  return (
    <div className="listcontainer">
      <div className="calender">
        <div className="listname">
          <span className="topyear">{format(currentMonth, 'yyyy')}</span>
          {format(currentMonth, 'MMMMMMMM')}
        </div>
         <img src={CalendarLeftBtn} className='leftBtn' onClick={prevMonth} alt="Previous Month" />
        <img src={CalendarRightBtn} className='rightBtn' onClick={nextMonth} alt="Next Month" />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          today={today}
          list={list}
          exist={exist}
          selectedDate={selectedDate}
          onDateClick={onDateClick}></RenderCells>
      </div>
    </div>
  );
};

export default Calender;
