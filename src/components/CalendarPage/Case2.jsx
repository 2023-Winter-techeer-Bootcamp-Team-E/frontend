import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import './DateNotification.css';
import { baseInstance } from '../../api/config';
import { useDateNotificationStore } from '../../stores/useDateNotificationStore';
import { useDiaryURL } from '../../stores/useDiaryURL';
import useIconUpdate from '../../stores/useIconUpdate';
import MaskingTape1 from '../../assets/img/MaskingTape1.png';
import MaskingTape2 from '../../assets/img/MaskingTape2.png';
import SelectImgBtn from '../../assets/img/SelectImgBtn.png';
import InnerImg1 from '../../assets/img/InnerImg/SelectInnerImg1.png';
import InnerImg2 from '../../assets/img/InnerImg/SelectInnerImg2.png';
import InnerImg3 from '../../assets/img/InnerImg/SelectInnerImg3.png';
import InnerImg4 from '../../assets/img/InnerImg/SelectInnerImg4.png';
import InnerImg5 from '../../assets/img/InnerImg/SelectInnerImg5.png';
import InnerImg6 from '../../assets/img/InnerImg/SelectInnerImg6.png';
import { useInnerPage } from '../../stores/useInnerPage';
import preBtn from '../../assets/img/Calendar/preBtn.png';


function Case2({ diaryMonth, diaryDay }) {
  const [inpageNum, setinPageNum] = useState(1);
  const { shareURL, setShareURL } = useDiaryURL();
  const { page, setPage } = useDateNotificationStore();
  const { innerPage, setInnerPage } = useInnerPage();
  const diarySettingRef = useRef(null);
  const maxInnerPaper = 6;
  const { iconUpdate, setIconUpdate } = useIconUpdate();
  const [upButtonHovered, setUpButtonHovered] = useState(false);
  const [downButtonHovered, setDownButtonHovered] = useState(false);

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
        setIconUpdate((prev) => prev + 1);
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
          <span style={{ color: '#FA9B55' }}>
            {diaryMonth}월 {diaryDay}일 {}
          </span>
          <br />
          일기를 작성해요!
        </SelectDateText>
        <SelectInnerPaperText>
          {' '}
          <span style={{ color: '#FA9B55', fontSize: '1.75rem' }}>
            일기 배경지
          </span>
          를 선택해 주세요
        </SelectInnerPaperText>

        <TopMaskingTape src={MaskingTape1} />
        {RotateImg(inpageNum)}
        <BottomMaskingTape src={MaskingTape2} />

        <SelectImgLeftBtn
          src={SelectImgBtn}
          onClick={() => {
            PageNumSub();
          }}
          onMouseEnter={() => setUpButtonHovered(true)}
          onMouseLeave={() => setUpButtonHovered(false)}
          src={upButtonHovered ? SelectImgBtn : preBtn}
          alt={upButtonHovered ? 'SelectImgBtn' : 'preBtn'}
        />
        <SelectImgRightBtn
          src={SelectImgBtn}
          onClick={() => {
            PageNumAdd();
          }}
          onMouseEnter={() => setDownButtonHovered(true)}
          onMouseLeave={() => setDownButtonHovered(false)}
          src={downButtonHovered ? SelectImgBtn : preBtn}
          alt={downButtonHovered ? 'SelectImgBtn' : 'preBtn'}
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
  width: 17.45rem;
  height: 44.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
`;

const InnerImg = styled.img`
  position: absolute;
  width: 12.3125rem;
  height: 18.9375rem;
  flex-shrink: 0;
  margin-top: 13.12rem;
  z-index: 2;
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

const SelectDateText = styled.p`
  position: absolute;
  margin-top: 4rem;
  color: #000000;
  /* font-family: 'bmjua';
  font-size: 1.325rem; */
  font-family: 'mong';
  font-size: 2rem;
  left: 1.19rem;
`;

const SelectInnerPaperText = styled.p`
  position: absolute;
  margin-top: 8.75rem;
  color: #777;
  font-family: 'mong';
  font-size: 1.5rem;
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
  margin-top: 12.7rem;
  margin-left: -11rem;
  z-index: 3;
`;

const BottomMaskingTape = styled.img`
  position: absolute;
  width: 3.75rem;
  height: 1.04506rem;
  transform: rotate(-30deg);
  flex-shrink: 0;
  margin-top: 31.3rem;
  margin-right: -11rem;
  z-index: 3;
`;

const SelectImgLeftBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  margin-top: 33.5rem;
  margin-left: -4rem;
  z-index: 2;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const SelectImgRightBtn = styled.img`
  position: absolute;
  flex-shrink: 0;
  height: 2.09863rem;
  width: 1.59675rem;
  flex-shrink: 0;
  margin-top: 33.5rem;
  margin-right: -4rem;
  z-index: 2;
  transform: rotate(-180deg);
  cursor: pointer;
  &:hover {
    transform: scale(1.2) rotate(180deg);
  }
`;

const CheckBtn = styled.div`
  position: absolute;
  margin-top: 36.81rem;
  width: 6.375rem;
  height: 2.8881rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #c1c3ff;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-family: 'bmjua';
  font-size: 1.25rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;