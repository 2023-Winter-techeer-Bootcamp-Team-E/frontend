//Calendar.jsx
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

// 캘린더 스타일을 정의하는 CSS 파일을 가져옵니다.
import './Calendar.css';

// 캘린더에 사용되는 이미지 파일들을 가져옵니다.
import CalendarRightBtn from '../../assets/img/CalendarRightBtn.png';
import CalendarLeftBtn from '../../assets/img/CalendarLeftBtn.png';
import DiaryViewIcon from '../../assets/img/Calendar/DiaryViewIcon.png';
import DiaryWriteIcon from '../../assets/img/Calendar/DiaryWriteIcon.png';
import DiaryEditIcon from '../../assets/img/Calendar/DiaryEditIcon.png';
import { useDateNotificationStore } from '../../store/useDateNotificationStore.js';

// 날짜를 형식에 맞게 포맷팅하는 함수를 정의합니다.
const getFormattedDate = (date, formatStr = 'd') => format(date, formatStr);

// 주어진 날짜 배열을 토대로 요일을 렌더링하는 컴포넌트입니다.
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
      {/* 각 요일을 표시합니다. */}
      {daysOfWeek.map((day, index) => (
        <div className="dayscol" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

// 날짜 셀을 렌더링하는 컴포넌트입니다.
const RenderCells = ({
  currentMonth,
  today,
  list,
  selectedDate,
  onDateClick,
  setDiarySettingPage,
  diaryInfoArray,
  diaryDay,
  setShareURL,
  setDiaryId,
}) => {
  // 현재 월의 시작일과 마지막일을 계산합니다.
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const page = useDateNotificationStore((state) => state.page);
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
  
    const diaryInfo = diaryInfoArray.find(
    (diary) => diary.day === formattedDate,
  );

  // 일기 조회 함수
  const readDiary = async () => {
    try {
      const response = await baseInstance.get('/diaries/link', {
        params: { day: `${diaryDay}` },
      });
      if (response.status === 200) {
        setShareURL(response.data.sns_link);
        setDiaryId(response.data.diary_id);
        useDateNotificationStore.setState({ page: 3 });
        console.log(useDateNotificationStore.getState().page);
        console.log(page);
      } else {
        console.log('일기장 확인 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생 : ', error);
    }
  };

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
        {/* 날짜를 표시합니다. */}
        <span className="date">{formattedDate}</span>

        {/* 해당 날짜에 속하는 다이어리 목록을 표시합니다. */}
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

        
        {shouldShowDiaryBtn && !diaryInfo && (
          <img    //일기작성
            className="GoToSelectInnerPaperBtn"
            src={DiaryWriteIcon}
            alt="Go to Diary"
            onClick={() => {
              onDateClick(day);
              useDateNotificationStore.setState({ page: 2 });
              console.log(useDateNotificationStore.getState().page);
              console.log('clicked')
            }}
          />
        )}

        {/* 다이어리 정보가 있고 유효한 날짜인 경우, 다이어리 뷰 또는 편집 버튼을 표시합니다. */}
        {diaryInfo &&
          !isFutureDate &&
          !isPastMonth &&
          !isNextMonth &&
          (diaryInfo.isExpiry ? (
            <img
            //작성 완료 이미지
              className="GoToShareURLBtn"
              src={DiaryViewIcon}
              alt="Go to Diary"
              onClick={() => console.log('view 버튼 눌림')}
            />
          ) : (
            <img
            //작성중 이미지
              className="GoToShareURLBtn"
              src={DiaryEditIcon}
              alt="Go to Diary"
              onClick={() => {
                console.log('GoToShareURLBtn clicked');
                onDateClick(day);
                readDiary();
                <Case3 
                diaryMonth={diaryMonth}
                diaryDay={diaryDay}
                setShareURL={setShareURL}
                />
              }}
            />
          ))}
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

// 캘린더 컴포넌트 정의
const Calendar = ({
  list,
  setDiarySettingPage,
  setDiaryMonth,
  setDiaryDay,
  diaryDay,
  shareURL,
  setShareURL,
}) => {
  // State 정의
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const [diaryInfoArray, setDiaryInfoArray] = useState([]);
  const pageNum = useDateNotificationStore((state) => state.page);

  // 이전 달로 이동하는 함수
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // 다음 달로 이동하는 함수
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));



  // 날짜를 클릭했을 때 실행되는 함수
  const onDateClick = (day) => {
    // 선택된 날짜를 업데이트하고 해당 날짜의 월과 일을 설정합니다.
    setSelectedDate(day);
    setDiaryMonth(format(day, 'M'));
    setDiaryDay(format(day, 'd'));
    console.log(day);
  };

  // 컴포넌트가 처음 마운트될 때와 currentMonth가 업데이트될 때 실행되는 useEffect
  useEffect(() => {
    // API를 통해 현재 월의 일기 데이터를 가져오는 함수
    const fetchData = async () => {
      const yearMonth = format(currentMonth, 'yyyy-MM');
      try {
        const response = await baseInstance.get(
          `/calendars/?year_month=${yearMonth}`,
        );
        if (response.data) {
          console.log(`${yearMonth} 달력 조회 성공!`);
          // 일기 데이터 및 일기 정보 배열 업데이트
          setDiaryData(response.data.diaries);
          const updatedDiaryInfoArray = response.data.diaries.map((diary) => ({
            day: diary.day,
            isExpiry: diary.is_expiry,
          }));
          setDiaryInfoArray(updatedDiaryInfoArray);
        }
      } catch (error) {
        console.log(`${yearMonth} 달력 조회 실패`);
        setDiaryInfoArray([]);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, [currentMonth]);

  // 컴포넌트 렌더링
  return (
    <div className="listcontainer">
      <div className="calendar">
        {/* 달력 상단에 현재 년도와 월을 표시하는 부분 */}
        <div className="listname">
          <span className="topyear">{format(currentMonth, 'yyyy')}</span>
          {format(currentMonth, 'MMMMMMMM')}
        </div>

        {/* 이전 달로 이동하는 버튼 */}
        <img
          src={CalendarLeftBtn}
          className="leftBtn"
          onClick={prevMonth}
          alt="Previous Month"
        />

        {/* 다음 달로 이동하는 버튼 */}
        <img
          src={CalendarRightBtn}
          className="rightBtn"
          onClick={nextMonth}
          alt="Next Month"
        />

        {/* 요일을 렌더링하는 컴포넌트 */}
        <RenderDays />

        {/* 각 날짜 셀을 렌더링하는 컴포넌트 */}
        <RenderCells
          currentMonth={currentMonth}
          today={new Date()}
          list={list}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          diaryData={diaryData}
          setDiarySettingPage={pageNum}
          diaryInfoArray={diaryInfoArray}
          // pageNum={pageNum}
        />
      </div>
    </div>
  );
};

// Calendar 컴포넌트를 내보냄
export default Calendar;
