import React, { useState, useEffect } from 'react';
import { baseInstance } from '../../api/config';
import { useDateNotificationStore } from '../../store/useDateNotificationStore';
import { useNavigate } from 'react-router-dom';
import { useDiaryURL } from '../../store/useDiaryURL';
import { useInnerPage } from '../../store/useInnerPage';
import { useSelectDateInfoStore } from '../../store/useSelectDateInfoStore';
import useIconUpdate from '../../store/useIconUpdate';
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryInfoArray, setDiaryInfoArray] = useState([]);
  const [diaryMonth, setDiaryMonth] = useState();
  const [diaryDay, setDiaryDay] = useState();
  const { setPage } = useDateNotificationStore.getState();
  const iconUpdate = useIconUpdate((state) => state.iconUpdate);
  const navigate = useNavigate();

  const changeMonth = (modifier) =>
    setCurrentMonth((prevMonth) => modifier(prevMonth, 1));

  const prevMonth = () => changeMonth(subMonths);
  const nextMonth = () => changeMonth(addMonths);

  const onDateClick = (day) => {
    setSelectedDate(day);
    const month = format(day, 'M');
    const dayOfMonth = format(day, 'd');
    setDiaryMonth(month);
    setDiaryDay(dayOfMonth);
    useSelectDateInfoStore.getState().setSelectDateInfo(month, dayOfMonth);
  };

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
  }, [currentMonth, iconUpdate]);

  const getFormattedDate = (date, formatStr = 'd') => format(date, formatStr);

  const RenderDays = () => (
    <div className="days row">
      {[
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ].map((day, index) => (
        <div className="dayscol" key={index}>
          {day}
        </div>
      ))}
    </div>
  );

  const RenderCells = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const navigate = useNavigate();
    const { innerPage, setInnerPage } = useInnerPage();

    const isDateInMonth = (date) => isSameMonth(date, currentMonth);
    const isDateSelected = (date) => isSameDay(date, selectedDate);
    const isDateToday = (date) => isSameDay(date, new Date());

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

      const { shareURL, setShareURL } = useDiaryURL();

      const readDiary = async () => {
        console.log('day: ', diaryInfo.day);
        try {
          const response = await baseInstance.get('/diaries/link', {
            params: { day: `${diaryInfo.day}` },
          });
          if (response.status === 200) {
            console.log('일기장 확인 성공!');
            setShareURL(response.data.sns_link);
            setPage(3);
            console.log(
              'useDateNotificationStore : ',
              useDateNotificationStore.getState().page,
            );
          } else {
            console.log('일기장 확인 실패');
          }
        } catch (error) {
          console.error('API 호출 중 오류 발생 : ', error);
        }
      };

      const readPast = async () => {
        try {
          // API 호출 시 포맷팅된 날짜를 사용하도록 변경
          const response = await baseInstance.get('/diaries/', {
            params: { day: `${formattedDate}` },
          });
    
          if (response.status === 200) {
            // API 응답이 성공할 경우 diary_bg_id를 InnerPage 상태로 업데이트
            setInnerPage(response.data.diary_bg_id);
    
            // day 값을 setSelectDateInfo 함수로 전달하여 상태로 저장
            // setSelectDateInfo(month, formattedDate);
            
            console.log(useInnerPage.getState().innerPage);
          } else {
            console.log('일기장 확인 실패');
          }
        } catch (error) {
          console.error('API 호출 중 오류 발생 : ', error);
        }
      };
      const diaryIcon =
        diaryInfo && !isFutureDate && !isPastMonth && !isNextMonth
          ? diaryInfo.isExpiry
            ? DiaryViewIcon
            : DiaryEditIcon
          : DiaryWriteIcon;

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
                setPage(2);
              }}
            />
          )}

          {diaryInfo && !isFutureDate && !isPastMonth && !isNextMonth && (
            <img
              className="GoToShareURLBtn"
              src={diaryIcon}
              alt="Go to Diary"
              onClick={() => {
                if (diaryInfo.isExpiry) {
                  console.log('작성이 끝난 다이어리 조회');
                  readPast()
                  navigate('../diary');
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
      const days = Array.from({ length: 7 }, (_, i) => addDays(startDay, i));
      return (
        <div className="bodyrow" key={startDay}>
          {days.map((day) => generateDateCell(day))}
        </div>
      );
    };

    const generateCalendarRows = () => {
      const startDay = startDate;
      const endDay = endOfWeek(endOfMonth(currentMonth));
      const rows = [];

      let currentDay = startDay;
      while (isBefore(currentDay, endDay) || isSameDay(currentDay, endDay)) {
        rows.push(generateDateRow(currentDay));
        currentDay = addDays(currentDay, 7);
      }
      return rows;
    };

    return <div className="calendarbody">{generateCalendarRows()}</div>;
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
        <RenderCells />
      </div>
    </div>
  );
};

export default Calendar;
