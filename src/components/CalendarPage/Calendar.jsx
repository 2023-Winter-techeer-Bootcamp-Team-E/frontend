// Calendar.jsx
import React, { useState, useEffect } from 'react';
import { baseInstance } from '../../api/config.js';
import { useNavigate } from 'react-router-dom';
import { useDiaryURL } from '../../store/useDiaryURL';
import { useDateNotificationStore } from '../../store/useDateNotificationStore';
import { useSelectDateInfoStore } from '../../store/useSelectDateInfoStore';
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
    'TUESDAY',
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
  selectedDate,
  onDateClick,
  diaryInfoArray,
  diaryDay,
}) => {
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const isDateInMonth = (date) => isSameMonth(date, currentMonth);
  const isDateSelected = (date) => isSameDay(date, selectedDate);
  const isDateToday = (date) => isSameDay(date, today);

  const generateDateCell = (day) => {
    const formattedDate = getFormattedDate(day);
    const isFutureDate = isAfter(day, new Date());
    const isPastMonth = isBefore(day, startOfMonth(currentMonth));
    const isNextMonth = isAfter(day, endOfMonth(currentMonth));
    const shouldShowDiaryBtn =
      !isFutureDate && !isPastMonth && !isNextMonth && isDateSelected(day);

    const diaryInfo = diaryInfoArray.find(
      (diary) => diary.day === formattedDate,
    );
    const navigate = useNavigate();
    const { shareURL, setShareURL } = useDiaryURL();
    const readDiary = async () => {
      try {
        console.log('day :', diaryDay); // 이제 day 변수를 사용하도록 변경
        const response = await baseInstance.get('/diaries/link', {
          params: { day: `${diaryDay}` },
        });
        if (response.status === 200) {
          setShareURL(response.data.sns_link);
          useDateNotificationStore.setState({ page: 3 });
          console.log(useDateNotificationStore.getState().page);
        } else {
          console.log('일기장 확인 실패');
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생 : ', error);
      }
    };

    useEffect(() => {
      if (diaryDay !== undefined) {
        readDiary();
      }
    }, [diaryDay]);

    return (
      <div
        className={`bodycol cell ${
          !isDateInMonth(day)
            ? 'not-valid'
            : isDateSelected(day)
              ? 'selected'
              : isDateToday(day)
                ? 'today'
                : 'valid'
        }`}
        key={day}
        onClick={() => onDateClick(day, shouldShowDiaryBtn)}>
        <span className="date">{formattedDate}</span>

        {shouldShowDiaryBtn && !diaryInfo && (
          <img
            className="GoToSelectInnerPaperBtn"
            src={DiaryWriteIcon}
            alt="Go to Diary"
            onClick={() => {
              onDateClick(day);
              useDateNotificationStore.setState({ page: 2 });
            }}
          />
        )}

        {diaryInfo && !isFutureDate && !isPastMonth && !isNextMonth && (
          <img
            className="GoToShareURLBtn"
            src={diaryInfo.isExpiry ? DiaryViewIcon : DiaryEditIcon}
            alt="Go to Diary"
            onClick={() => {
              // onDateClick(day);

              if (diaryInfo.isExpiry) {
                // isExpiry가 true이면 /diary 페이지로 이동
                navigate('/diary');
              } else {
                readDiary();
              }
            }}
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryInfoArray, setDiaryInfoArray] = useState([]);
  const [diaryDay, setDiaryDay] = useState();
  const [diaryMonth, setDiaryMonth] = useState();

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const onDateClick = (day) => {
    console.log('onDateClick : ', day);
    setSelectedDate(day);
    setDiaryDay(format(day, 'd'));
    setDiaryMonth(format(day, 'M'));
  };

  const { selectedMonth, selectedDay } = useSelectDateInfoStore.getState();

  // 달력 데이터를 불러오는 useEffect 추가
  useEffect(() => {
    const fetchData = async () => {
      const yearMonth = format(currentMonth, 'yyyy-MM');
      try {
        const response = await baseInstance.get(
          `/calendars/?year_month=${yearMonth}`,
        );
        if (response.data) {
          console.log(`${yearMonth} 달력 조회 성공!`);
          setDiaryInfoArray(
            response.data.diaries.map((diary) => ({
              day: diary.day,
              isExpiry: diary.is_expiry,
            })),
          );
        }
      } catch (error) {
        console.log(`${yearMonth} 달력 조회 실패`);
        setDiaryInfoArray([]);
      }
    };

    fetchData();
  }, [currentMonth]); // currentMonth가 변경될 때마다 useEffect 실행

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
          today={new Date()}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          diaryInfoArray={diaryInfoArray}
          diaryDay={diaryDay}
        />
      </div>
    </div>
  );
};

export default Calendar;
