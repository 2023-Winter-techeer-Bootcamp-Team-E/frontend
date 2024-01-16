// Calendar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseInstance } from '../../api/config.js';
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
  isBefore,
} from 'date-fns';
import './Calendar.css';
import CalendarRightBtn from '../../assets/img/CalendarRightBtn.png';
import CalendarLeftBtn from '../../assets/img/CalendarLeftBtn.png';
import DiaryViewIcon from '../../assets/img/Calendar/DiaryViewIcon.png';
import DiaryWriteIcon from '../../assets/img/Calendar/DiaryWriteIcon.png';
import DiaryEditIcon from '../../assets/img/Calendar/DiaryEditIcon.png';

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
  setDiarySettingPage,
  existingDiaryDates,
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
    const isPastMonth = isBefore(day, startOfMonth(currentMonth));
    const isNextMonth = isAfter(day, endOfMonth(currentMonth));

    const shouldShowDiaryBtn =
      !isFutureDate && !isPastMonth && !isNextMonth && isDateSelected(day);

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
        {shouldShowDiaryBtn && (
          <img
            className="GoToDiaryBtn"
            src={DiaryWriteIcon}
            alt="Go to Diary"
            onClick={() => setDiarySettingPage(2)}
          />
        )}
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
  setDiaryMonth,
  setDiaryDay,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const [calendarsData, setCalendarsData] = useState([]);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const today = new Date();
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateClick = (day) => {
    setSelectedDate(day);
    setDiaryMonth(format(day, 'M'));
    setDiaryDay(format(day, 'd'));
    console.log(day);
  };

  const [existingDiaryDates, setExistingDiaryDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const yearMonth = format(currentMonth, 'yyyy-MM');
      try {
        const response = await baseInstance.get(
          `/calendars/?year_month=${yearMonth}`,
        );
        if (response.status === 200 && response.data.code === 'C001') {
          console.log(`${yearMonth} 달력 조회 성공!`);
          setDiaryData(response.data.diaries);

          setExistingDiaryDates(
            response.data.diaries
              .filter((diary) => !diary.is_expired)
              .map((diary) => Number(diary.day)),
          );
        }
      } catch (error) {
        console.log(`${yearMonth} 달력 조회 실패`);
      }
    };
    // 페이지 로딩시에 API 호출
    fetchData();
  }, [currentMonth]);

  // // existingDiaryDates 업데이트 이후 값 출력
  // useEffect(() => {
  //   console.log('일기가 존재하는 날 :', existingDiaryDates);
  // }, [existingDiaryDates]);

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
          existingDiaryDates={existingDiaryDates}
        />
      </div>
    </div>
  );
};

export default Calendar;
