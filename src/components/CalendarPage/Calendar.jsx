// Calendar.jsx
import React, { useState } from 'react';
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

const getFormattedDate = (date, formatStr = 'd') => format(date, formatStr);

const RenderDays = () => {
  const daysOfWeek = [
    'SUNDAY',
    'MONDAY',
    'THUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  return (
    <div className="days row">
      {daysOfWeek.map((day, index) => (
        <div className="dayscol" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

const RenderCells = ({
  currentMonth,
  today,
  list,
  selectedDate,
  onDateClick,
  diaryData,
  setDiarySettingPage,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const isDateInMonth = (date) => isSameMonth(date, monthStart);
  const isDateSelected = (date) => isSameDay(date, selectedDate);
  const isDateToday = (date) => isSameDay(date, today);

  const generateDateCell = (day) => {
    const formattedDate = getFormattedDate(day);
    const isFutureDate = isAfter(day, new Date());

    let diaryBtn = null;
    if (!isFutureDate && isDateSelected(day)) {
      diaryBtn = (
        <img
          className="GoToDiaryBtn"
          src={
            diaryData.some((data) => data.is_expiry === 'true')
              ? DiaryViewIcon
              : DiaryWriteIcon
          }
          alt="Go to Diary"
          onClick={() => setDiarySettingPage(2)}
        />
      );
    }

    return (
      <div
        className={`bodycol cell ${
          !isDateInMonth(day)
            ? 'out-of-month'
            : isDateSelected(day)
              ? 'selected'
              : isDateToday(day)
                ? 'today'
                : 'valid'
        }`}
        key={day}
        onClick={() => onDateClick(day)}>
        <span className="date">{formattedDate}</span>
        {Array.isArray(list) &&
          list
            .filter(
              (x) =>
                new Date(x.diary_date).toDateString() === day.toDateString(),
            )
            .map((data, index) => (
              <span key={index} className="listemoji">
                {data.emoji}
              </span>
            ))}
        {diaryBtn}
      </div>
    );
  };

  const generateDateRow = (startDay) => {
    const days = [];
    let day = startDay;

    for (let i = 0; i < 7; i++) {
      days.push(generateDateCell(day));
      day = addDays(day, 1);
    }

    return (
      <div className="bodyrow" key={startDay}>
        {days}
      </div>
    );
  };

  const generateCalendarRows = () => {
    const rows = [];
    let startDay = startDate;

    while (startDay <= endDate) {
      rows.push(generateDateRow(startDay));
      startDay = addDays(startDay, 7);
    }

    return rows;
  };

  return <div className="calendarbody">{generateCalendarRows()}</div>;
};

const Calendar = ({
  list,
  setDiarySettingPage,
  diaryMonth,
  setDiaryMonth,
  diaryDay,
  setDiaryDay,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  // const [diaryMonth, setDiaryMonth] = useState(format(new Date(), 'M'));
  // const [diaryDay, setDiaryDay] = useState(format(new Date(), 'd'));

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const today = new Date();
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const onDateClick = (day) => {
    setSelectedDate(day);
    setDiaryMonth(format(day, 'M'));
    setDiaryDay(format(day, 'd'));
    console.log(day);
  };

  return (
    <div className="listcontainer">
      <div className="calendar">
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
          diaryData={diaryData}
          setDiarySettingPage={setDiarySettingPage}
        />
      </div>
    </div>
  );
};

export default Calendar;
