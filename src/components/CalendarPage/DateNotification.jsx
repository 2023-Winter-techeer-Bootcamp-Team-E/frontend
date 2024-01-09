import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { useNavigate } from 'react-router-dom';
import './DateNotification.css';

// 이미지 import
import Cloud1 from '../../assets/img/Cloud1.png';
import Cloud2 from '../../assets/img/Cloud2.png';
import InnerImg1 from '../../assets/img/InnerImg1.png';
import InnerImg2 from '../../assets/img/InnerImg2.png';
import InnerImg3 from '../../assets/img/InnerImg3.png';
import InnerImg4 from '../../assets/img/InnerImg4.png';
import InnerImg5 from '../../assets/img/InnerImg5.png';
import InnerImg6 from '../../assets/img/InnerImg6.png';
import SelectImgBtn from '../../assets/img/SelectImgBtn.png';
import MaskingTape1 from '../../assets/img/MaskingTape1.png';
import MaskingTape2 from '../../assets/img/MaskingTape2.png';
import BackBtn from '../../assets/img/BackBtn.png';
import DiaryWritePen from '../../assets/img/DiaryWritePen.png';

const RightSticker = () => {
  const navigate = useNavigate();

  const [diarySettingPage, setDiarySettingPage] = useState(3);
  const [pageNum, setPageNum] = useState(1);

  //날짜 임시 설정
  const [diaryMonth, setDiaryMonth] = useState(3);
  const [diaryDay, setDiaryDay] = useState(6);
  const [shareURL, setShareURL] = useState('https://blog.naver.com/hijinoo_');

  const diarySettingRef = useRef(null);
  const maxInnerPaper = 6; //속지 종류 수

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        diarySettingRef.current &&
        !diarySettingRef.current.contains(event.target)
      ) {
        setDiarySettingPage(1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [diarySettingRef]);

  const PageNumSub = () => {
    if (pageNum > 1) {
      setPageNum((PageNum) => PageNum - 1); // 이전 상태를 가져와서 변경
    }
  };

  const PageNumAdd = () => {
    if (pageNum < maxInnerPaper) {
      setPageNum((prevPageNum) => prevPageNum + 1); // 이전 상태를 가져와서 변경
    }
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
          html: '친구에게 공유해 보세요!',
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

  const RotateImg = (pageNum) => {
    switch (
      pageNum // 이미지는 임시로 가져온거고 나중에 DB에서 가져와서 쓸 예정
    ) {
      case 1:
        return <InnerImg src={InnerImg1} />;
      case 2:
        return <InnerImg src={InnerImg2} />;
      case 3:
        return <InnerImg src={InnerImg3} />;
      case 4:
        return <InnerImg src={InnerImg4} />;
      case 5:
        return <InnerImg src={InnerImg5} />;
      case 6:
        return <InnerImg src={InnerImg6} />;
      default:
        return null;
    }
  };

  const renderDiarySettingPage = () => {
    switch (diarySettingPage) {
      case 1:
        return (
          <DiarySettingWindow>
            <NotifyText>
              <div>친구들과 나의 특별한 순간을 공유할 날짜를 선택해주세요!</div>
            </NotifyText>
          </DiarySettingWindow>
        );
      case 2:
        return (
          <DiarySettingWindow>
            <SelectDateText>
              {diaryMonth}월 {diaryDay}일 일기를 작성해요!
            </SelectDateText>
            <SelectInnerPaperText>
              일기 배경지를 선택해 주세요
            </SelectInnerPaperText>

            <TopMaskingTape src={MaskingTape1} />
            {RotateImg(pageNum)}
            <BottomMaskingTape src={MaskingTape2} />

            <SelectImgLeftBtn src={SelectImgBtn} onClick={PageNumSub} />
            <SelectImgRightBtn src={SelectImgBtn} onClick={PageNumAdd} />

            <CheckBtn onClick={() => setDiarySettingPage(3)}>확인</CheckBtn>
          </DiarySettingWindow>
        );
      case 3:
        return (
          <DiarySettingWindow>
            <BackButton src={BackBtn} onClick={() => setDiarySettingPage(2)} />

            <SelectDateText2>
              <div>
                {diaryMonth}월 {diaryDay}일 일기를
              </div>
              <div>친구들에게 공유해 봐요!</div>
            </SelectDateText2>

            <ShareURL>{shareURL}</ShareURL>
            <CopyBtn onClick={copyToClipboard}>복사</CopyBtn>
            <Line />
            <LetsWriteText>일기를 작성하러 가볼까요?</LetsWriteText>
            <WriteDiaryBtn onClick={() => navigate('/diary')}>
              작성하기 <DiaryWritePenIcon src={DiaryWritePen} />
            </WriteDiaryBtn>
          </DiarySettingWindow>
        );
      default:
        return <p>오류 코드 : '{diarySettingPage}'</p>;
    }
  };

  return (
    <RightStickerContainer ref={diarySettingRef}>
      <StyledCloud1 src={Cloud1} alt="Cloud 1" />
      <StyledCloud2 src={Cloud2} alt="Cloud 2" />
      {renderDiarySettingPage()}
    </RightStickerContainer>
  );
};

const RightStickerContainer = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
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

const DiarySettingWindow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  z-index: 15;

  color: #000;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: Bold;
  font-weight: 900;
  line-height: normal;
`;

const NotifyText = styled.div`
  margin-top: 5rem;
`;

const SelectDateText = styled.p`
  position: absolute;
  margin-top: 4.69rem;
  color: #2c199f;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 1.19rem;
`;

const SelectInnerPaperText = styled.p`
  position: absolute;
  margin-top: 8.75rem;
  color: #9f9f9f;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 1.19rem;
`;

const InnerImg = styled.img`
  position: absolute;
  width: 12.3125rem;
  height: 18.9375rem;
  flex-shrink: 0;
  margin-top: 11.12rem;
  z-index: 2;
`;

const TopMaskingTape = styled.img`
  position: absolute;
  width: 3.75rem;
  height: 1.04506rem;
  transform: rotate(-30deg);
  flex-shrink: 0;
  margin-top: 11rem;
  margin-left: -10rem;
  z-index: 3;
`;

const BottomMaskingTape = styled.img`
  position: absolute;
  width: 3.75rem;
  height: 1.04506rem;
  transform: rotate(-30deg);
  flex-shrink: 0;
  margin-top: 29rem;
  margin-right: -10rem;
  z-index: 3;
`;

const SelectImgLeftBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  margin-top: 31.06rem;
  margin-left: -4rem;
  z-index: 2;
  cursor: pointer;
`;

const SelectImgRightBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  flex-shrink: 0;
  margin-top: 31.06rem;
  margin-right: -4rem;
  z-index: 2;
  transform: rotate(-180deg);
  cursor: pointer;
`;

const CheckBtn = styled.div`
  position: absolute;
  margin-top: 34.81rem;
  width: 5.375rem;
  height: 2.38881rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #c1c3ff;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
const PageFrame = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  display: flex;
  justify-content: center;

  z-index: 15;

  color: #000;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: Bold;
  font-weight: 900;
  line-height: normal;
`;

const SelectDateText2 = styled.p`
  position: absolute;
  margin-top: 6rem;
  color: #2c199f;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  left: 1.19rem;
`;

const ShareURL = styled.div`
  position: absolute;
  margin-top: 11rem;
  margin-right: 4rem;
  width: 9rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 0.3rem;

  color: #000;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
`;

const CopyBtn = styled.button`
  position: absolute;
  margin-top: 11rem;
  margin-left: 10rem;
  width: 4rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  background: #cad9ff;

  color: #fff;
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
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
  width: 11.625rem;
  color: #2c199f;
  align-items: center;
  justify-content: center;

  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const WriteDiaryBtn = styled.div`
  position: absolute;
  margin-top: 24.5rem;
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
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const BackButton = styled.img`
  position: absolute;
  margin-top: 1rem;
  margin-right: 12rem;
  width: 1.625rem;
  height: 1.625rem;
  flex-shrink: 0;
  cursor: pointer;
`;

const DiaryWritePenIcon = styled.img`
  position: absolute;
  width: 1.625rem;
  margin-bottom: 0.3rem;
  margin-left: 6rem;
  height: 1.625rem;
  flex-shrink: 0;
`;

export default RightSticker;
