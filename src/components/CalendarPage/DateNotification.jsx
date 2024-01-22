import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import './DateNotification.css';
import { baseInstance } from '../../api/config';

// 이미지 import
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';
import { useDateNotificationStore } from '../store/useDateNotificationStore'; 
import Case1 from './Case1';
import Case2 from './Case2';
import Case3 from './Case3';

// DateNotification 컴포넌트 정의
const DateNotification = ({
  // diarySettingPage,
  // setDiarySettingPage,
  diaryMonth,
  setDiaryMonth,
  diaryDay,
  setShareURL,
  shareURL,
}) => {
  // 기타 코드 생략

  const { page, setPage } = useDateNotificationStore();
  // const [InnerPageNum, setInnerPageNum] = useState(1);
  const [diarySettingPage, setDiarySettingPage] = useState(null);

  const diarySettingRef = useRef(null);

 //diarySettingRef가 변경될 때마다 
  useEffect(() => {
    function handleClickOutside(event) {
      // diarySettingRef가 존재하고 클릭된 요소가 ref 밖에 있다면 실행
      if (diarySettingRef.current && !diarySettingRef.current.contains(event.target)) {
        setDiarySettingPage(1);
      }
    }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [diarySettingRef]);


  // 클립보드에 텍스트 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareURL)
      .then(() => {
        // 성공적으로 복사되었을 때의 알림
        Swal.fire({
          toast: true,
          position: 'top',
          icon: 'success',
          title: 'URL 복사 완료',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
          html: '친구에게 공유해 보세요!',
        });
      })
      .catch((error) => {
        // 복사 실패 시의 알림
        console.error('클립보드 복사 실패:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'URL 복사 실패',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
      });
  };

  const InnerPaperRotate = () => {
    switch (inpageNum) {
      case 1:
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
      case 2:
        return <InnerPaperImg src={MainInnerImg2} ref={diaryRef} />;
      case 3:
        return <InnerPaperImg src={MainInnerImg3} ref={diaryRef} />;
      case 4:
        return <InnerPaperImg src={MainInnerImg4} ref={diaryRef} />;
      case 5:
        return <InnerPaperImg src={MainInnerImg5} ref={diaryRef} />;
      case 6:
        return <InnerPaperImg src={MainInnerImg6} ref={diaryRef} />;
      default:
        return <InnerPaperImg src={MainInnerImg1} ref={diaryRef} />;
    }
    };
    
  return (
    <RightStickerContainer ref={diarySettingRef}>
      <StyledCloud1 src={Cloud1} alt="Cloud 1" />
      <StyledCloud2 src={Cloud2} alt="Cloud 2" />
      {page === 1 && <Case1 
      diaryMonth={diaryMonth}
      diaryDay={diaryDay}
      setShareURL={setShareURL}
      />}

      {page === 2 && <Case2 
      diaryMonth={diaryMonth}
      diaryDay={diaryDay}
      setShareURL={setShareURL}
      />}

      {page === 3 && <Case3 
      diaryMonth={diaryMonth}
      diaryDay={diaryDay}
      setShareURL={setShareURL}
      />}
    </RightStickerContainer>
  );
};

export default DateNotification;

const RightStickerContainer = styled.div`
  // width: 15.1875rem;
  // height: 41.0625rem;
  // border-radius: 1.875rem;
  // background: #e7eef9;
`;
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
