import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import './DateNotification.css';
import { baseInstance } from '../../api/config';
import { useDateNotificationStore } from '../../store/useDateNotificationStore';
import { useDiaryURL } from '../../store/useDiaryURL';
import MaskingTape1 from '../../assets/img/MaskingTape1.png';
import MaskingTape2 from '../../assets/img/MaskingTape2.png';
import SelectImgBtn from '../../assets/img/SelectImgBtn.png';
import InnerImg1 from '../../assets/img/InnerImg/SelectInnerImg1.png';
import InnerImg2 from '../../assets/img/InnerImg/SelectInnerImg2.png';
import InnerImg3 from '../../assets/img/InnerImg/SelectInnerImg3.png';
import InnerImg4 from '../../assets/img/InnerImg/SelectInnerImg4.png';
import InnerImg5 from '../../assets/img/InnerImg/SelectInnerImg5.png';
import InnerImg6 from '../../assets/img/InnerImg/SelectInnerImg6.png';
import { useInnerPage } from '../../store/useInnerPage';

function Case2({ diaryMonth, diaryDay }) {
  const [inpageNum, setinPageNum] = useState(1);
  const { shareURL, setShareURL } = useDiaryURL();
  const { page, setPage } = useDateNotificationStore();
  const { innerPage, setInnerPage } = useInnerPage();
  const diarySettingRef = useRef(null);
  const maxInnerPaper = 6;

  //일기생성
  const createDiary = async () => {
    try {
      const response = await baseInstance.post('/diaries/', {
        day: `${diaryDay}`,
        diary_bg_id: inpageNum,
      });
      if (response.status === 200) {
        console.log('일기장 생성 성공');
        setShareURL(response.data.sns_link);
        setInnerPage(response.data.diary_bg_id);
        setPage(3);
        console.log(
          'DateNotification page',
          useInnerPage.getState().innerPage,
          useDateNotificationStore.getState().page,
          '페이지로 넘어감',
        );
        console.log('background Num: ', response.data.diary_bg_id);
      } else {
        console.log('일기장 생성 실패');
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생 : ', error);
    }
  };

  const PageNumSub = () => {
    if (inpageNum > 1) {
      setinPageNum((inpageNum) => inpageNum - 1); // 이전 상태를 가져와서 변경
    }
  };

  const PageNumAdd = () => {
    if (inpageNum < maxInnerPaper) {
      setinPageNum((inpageNum) => inpageNum + 1); // 이전 상태를 가져와서 변경
    }
  };

  const RotateImg = (inpageNum) => {
    switch (inpageNum) {
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
        <SelectDateText>
          {diaryMonth}월 {diaryDay}일 일기를 작성해요!
        </SelectDateText>
        <SelectInnerPaperText>일기 배경지를 선택해 주세요</SelectInnerPaperText>

        <TopMaskingTape src={MaskingTape1} />
        {RotateImg(inpageNum)}
        <BottomMaskingTape src={MaskingTape2} />

        <SelectImgLeftBtn
          src={SelectImgBtn}
          onClick={() => {
            PageNumSub();
          }}
        />
        <SelectImgRightBtn
          src={SelectImgBtn}
          onClick={() => {
            PageNumAdd();
          }}
        />

        <CheckBtn
          onClick={() => {
            createDiary();
          }}>
          확인
        </CheckBtn>
      </DiarySettingWindow>
    </RightStickerContainer>
  );
}

export default Case2;

const RightStickerContainer = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
`;

const InnerImg = styled.img`
  position: absolute;
  width: 12.3125rem;
  height: 18.9375rem;
  flex-shrink: 0;
  margin-top: 11.12rem;
  z-index: 2;
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
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
