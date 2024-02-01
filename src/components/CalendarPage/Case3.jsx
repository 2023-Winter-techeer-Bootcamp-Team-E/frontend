import React, { useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import DiaryWritePen from '../../assets/img/DiaryWritePen.png';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import CopyURL from '../../assets/img/Calendar/CopyURL.png';
import { useNavigate } from 'react-router-dom';
import { useDiaryURL } from '../../stores/useDiaryURL';
import { useDateNotificationStore } from '../../stores/useDateNotificationStore';

const Case3 = ({ diaryMonth, diaryDay }) => {
  const { shareURL } = useDiaryURL();
  const navigate = useNavigate();

  const handleWriteDiaryClick = () => {
    const relativePathURL = new URL(shareURL).pathname;
    navigate(relativePathURL);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareURL)
      .then(() => {
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
          html: '친구에게 URL을 공유해 보세요!',
        });
      })
      .catch((error) => {
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

  const diarySettingRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        diarySettingRef.current &&
        !diarySettingRef.current.contains(event.target)
      ) {
        useDateNotificationStore.getState().resetPage();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [diarySettingRef]);

  return (
    <RightStickerContainer ref={diarySettingRef}>
      <DiarySettingWindow>
        <SelectDateText2>
          <div>
            {diaryMonth}월 {diaryDay}일 일기를
          </div>
          <div>친구들에게 공유해 봐요!</div>
        </SelectDateText2>

        <ShareURL>{shareURL}</ShareURL>
        <CopyDiv onClick={copyToClipboard}>
          <CopyBtn src={CopyURL} />
        </CopyDiv>
        <Line />
        <LetsWriteText>일기를 작성하러 가볼까요? </LetsWriteText>
        <WriteDiaryBtn onClick={handleWriteDiaryClick}>
          {/* onClick={() => (window.location.href = `http://${shareURL}`)}> */}
          작성하기 <DiaryWritePenIcon src={DiaryWritePen} />
        </WriteDiaryBtn>
      </DiarySettingWindow>
    </RightStickerContainer>
  );
};
const RightStickerContainer = styled.div`
  width: 17.45rem;
  height: 42.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
  margin-top: -1rem;
`;
const SelectDateText2 = styled.p`
  position: absolute;
  margin-top: 6rem;
  color: #2c199f;
  font-family: 'mong';
  font-size: 1.75rem;
  left: 2rem;
`;
const DiarySettingWindow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  z-index: 15;

  color: #000;
  font-size: 1rem;
  font-style: Bold;
  font-weight: 900;
  line-height: normal;
`;

const ShareURL = styled.p`
  position: absolute;
  margin-top: 11rem;
  margin-right: 3.5rem;
  width: 10rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;

  color: #000;
  font-family: Inter;
  font-size: 0.875rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyDiv = styled.div`
  position: absolute;
  margin-top: 11rem;
  margin-left: 11rem;
  width: 3.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #cad9ff;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-family: 'bmjua';
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const CopyBtn = styled.img`
  width: 1.625rem;
  height: 1.625rem;
`;

const Line = styled.hr`
  position: absolute;
  margin-top: 17.5rem;
  width: 13.1875rem;
  height: 0.0625rem;
  background: #91b6ff;
`;

const LetsWriteText = styled.p`
  position: absolute;
  margin-top: 20.87rem;
  /* width: 11.625rem; */
  color: #2c199f;
  align-items: center;
  justify-content: center;

  font-family: 'mong';
  font-size: 1.625rem;
`;

const WriteDiaryBtn = styled.div`
  position: absolute;
  margin-top: 26.5rem;
  width: 12.6875rem;
  height: 2.38881rem;
  flex-shrink: 0;
  border-radius: 1.875rem;
  background: #e7eef9;
  border-radius: 1.25rem;
  background: #c1c3ff;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: 'bmjua';
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const DiaryWritePenIcon = styled.img`
  position: absolute;
  width: 1.625rem;
  margin-bottom: 0.3rem;
  margin-left: 7rem;
  height: 1.625rem;
  flex-shrink: 0;
`;

export default Case3;
