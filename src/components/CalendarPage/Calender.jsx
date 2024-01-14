import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isAfter,
} from 'date-fns';
import './Calendar.css';
import CalendarRightBtn from '../../assets/img/CalendarRightBtn.png';
import CalendarLeftBtn from '../../assets/img/CalendarLeftBtn.png';
import DiaryViewIcon from '../../assets/img/Calendar/DiaryViewIcon.png';
import DiaryWriteIcon from '../../assets/img/Calendar/DiaryWriteIcon.png';

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
  selectedDate,
  onDateClick,
  diaryData,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const handleClick = (day) => {
    const isFutureDate = isAfter(day, new Date());

    if (!isFutureDate && isSameDay(day, selectedDate)) {
      return (
        <img
          className="GoToDiaryBtn"
          src={
            diaryData.some((data) => data.is_expiry === 'true')
              ? DiaryViewIcon
              : DiaryWriteIcon
          }
          alt="Go to Diary"
          onClick={() => {
            () => {};
          }}
        />
      );
    }
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
          {handleClick(day)}
        </div>,
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

const Calender = ({ list }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]); // Add diaryData state
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const today = new Date();
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
    console.log(day);
  };

  return (
    <div className="listcontainer">
      <div className="calender">
        <div className="listname">
          <span className="topyear">{format(currentMonth, 'yyyy')}</span>
          {format(currentMonth, 'MMMMMMMM')}
        </div>
        <img
          src={CalendarLeftBtn}
          className="leftBtn"
          onClick={prevMonth}
          alt="Previous Month"
        />
        <img
          src={CalendarRightBtn}
          className="rightBtn"
          onClick={nextMonth}
          alt="Next Month"
        />
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          today={today}
          list={list}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          diaryData={diaryData} // Pass diaryData as a prop
        />
      </div>
    </div>
  );
};

export default Calender;
