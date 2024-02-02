import React, { useState, useEffect, useRef } from 'react';
import { baseInstance } from '../../api/config';
import { useDateNotificationStore } from '../../stores/useDateNotificationStore';
import { useSelectDateInfoStore } from '../../stores/useSelectDateInfoStore';
import { useNavigate } from 'react-router-dom';
import { useDiaryURL } from '../../stores/useDiaryURL';
import { useInnerPage } from '../../stores/useInnerPage';
import useIconUpdate from '../../stores/useIconUpdate';
import CalendarStickers from '../../components/CalendarPage/CalendarStickers';
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

const Calendar = ({ selectedSticker, setSelectedSticker }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryInfoArray, setDiaryInfoArray] = useState([]);
  const [stickerInfoArr, setStickerInfoArr] = useState([]);
  const { setPage } = useDateNotificationStore.getState();
  const { setShareURL } = useDiaryURL();
  const iconUpdate = useIconUpdate((state) => state.iconUpdate);
  const navigate = useNavigate();
  const diaryRef = useRef(null);

  const handleDeleteStickers = () => {
    setSelectedSticker(false);
  };

  const printSticker = () => {
    console.log('stickerInfoArr:', stickerInfoArr);
    return stickerInfoArr.map((stickerInfo, index) => (
      <img
        key={index}
        src={stickerInfo[0]} // 이미지 URL
        style={{
          top: `${stickerInfo[1] + 28}px`, // top 값
          left: `${stickerInfo[2] + 484 + -0.5 * (stickerInfo[3] - 100)}px`, // left 값
          width: `${stickerInfo[3]}px`, // width 값
          height: `${stickerInfo[4]}px`, // height 값
          transform: `rotate(${stickerInfo[5]}deg)`, // rotate 값
          position: 'absolute',
          zIndex: 1,
          // 추가적인 스타일 속성들도 필요에 따라 설정 가능
        }}
        alt={`Sticker ${index + 1}`}
      />
    ));
  };

  const changeMonth = (modifier) =>
    setCurrentMonth((prevMonth) => modifier(prevMonth, 1));

  const prevMonth = () => changeMonth(subMonths);
  const nextMonth = () => changeMonth(addMonths);

  const onDateClick = (day) => {
    setSelectedDate(day);
    const month = format(day, 'M');
    const dayOfMonth = format(day, 'd');
    useSelectDateInfoStore.getState().setSelectDateInfo(month, dayOfMonth);
  };

  useEffect(() => {
    setStickerInfoArr([]);
    const fetchData = async () => {
      const yearMonth = format(currentMonth, 'yyyy-MM');
      try {
        const response = await baseInstance.get(
          `/calendars/?year_month=${yearMonth}`,
        );
        if (response.data) {
          console.log(`${yearMonth} 달력 조회 성공!`);
          const extractedStickerInfo = response.data.sticker_image_url.map(
            (sticker) => [
              sticker.sticker_image_url,
              sticker.top,
              sticker.left,
              sticker.width,
              sticker.height,
              sticker.rotate,
            ],
          );

          setDiaryInfoArray(
            response.data.diaries.map((diary) => ({
              day: diary.day,
              isExpiry: diary.is_expiry,
            })),
          );
          console.log('Extracted Sticker Info:', extractedStickerInfo);
          setStickerInfoArr(extractedStickerInfo);
        }
      } catch (error) {
        setDiaryInfoArray([]);
        console.log(`${yearMonth} 달력 조회 실패`);
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

    const { innerPage, setInnerPage } = useInnerPage();
    const isDateInMonth = (date) => isSameMonth(date, currentMonth);
    const isDateSelected = (date) => isSameDay(date, selectedDate);
    const isDateToday = (date) => isSameDay(date, new Date());

    const generateDateCell = (day) => {
      const formattedDate = getFormattedDate(day);
      const isFutureDate = isAfter(day, new Date());
      const isPastMonth = isBefore(day, startOfMonth(currentMonth));
      const isNextMonth = isAfter(day, endOfMonth(currentMonth));
      const setSelectDateInfo = useSelectDateInfoStore(
        (state) => state.setSelectDateInfo,
      );

      const shouldShowDiaryBtn =
        !isFutureDate && !isPastMonth && !isNextMonth && isDateSelected(day);

      const diaryInfo = diaryInfoArray.find(
        (diary) => diary.day === formattedDate,
      );

      const handleMakeURL = (id) => {
        const location = window.location;
        const link = `${location.protocol}//${location.host}/diary/${id}`;
        setShareURL(link);
        console.log(link);
      };

      const readDiary = async () => {
        console.log('day: ', diaryInfo.day);
        try {
          const response = await baseInstance.get('/diaries/link', {
            params: { day: `${diaryInfo.day}` },
          });
          if (response.status === 200) {
            console.log('일기장 확인 성공!');

            handleMakeURL(response.data.diary_id);

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
          const response = await baseInstance.get('/diaries/', {
            params: { day: `${formattedDate}` },
          });

          if (response.status === 200) {
            setSelectDateInfo(response.data);
            console.log(formattedDate);
            setInnerPage(response.data.diary_bg_id);
            console.log(useInnerPage.getState().innerPage);
            navigate('../past');
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
                  readPast();
                } else {
                  readDiary();
                  console.log('다이어리 조회 실패');
                }
              }}
            />
          )}
          {printSticker()}
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
      {selectedSticker && (
        <CalendarStickers
          onDelete={handleDeleteStickers}
          image={selectedSticker}
          parentRef={diaryRef}
        />
      )}
      <div className="calendar" ref={diaryRef}>
        <div className="listname" style={{ zIndex: 100 }}>
          <span className="topyear">{format(currentMonth, 'yyyy')}</span>
          {format(currentMonth, 'MMMMMMMM')}
        </div>
        <img
          style={{ zIndex: 100 }}
          src={CalendarLeftBtn}
          className="leftBtn"
          onClick={prevMonth}
          alt="Previous Month"
        />
        <img
          style={{ zIndex: 100 }}
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
