import React, { useState } from 'react';
import { styled } from 'styled-components';
import Cloud1 from '../assets/img/Cloud1.png';
import Cloud2 from '../assets/img/Cloud2.png';
import DateSetting from './CalendarPage/RightSticker/DateSetting';
import SelectInnerPaper from './CalendarPage/RightSticker/SelectInnerPaper';
import ShareLink from './CalendarPage/RightSticker/ShareLink';

const RightSticker = () => {
  const [diarySettingPage, setDiarySettingPage] = useState(2);

  const handleDiarySettingPageChange = (newPage) => {
    setDiarySettingPage(newPage);
  };

  const renderDiarySettingPage = () => {
    switch (diarySettingPage) {
      case 1:
        return <DateSetting />;
      case 2:
        return <SelectInnerPaper />;
      case 3:
        return <ShareLink />;
      default:
        return null;
    }
  };

  return (
    <RightStickerContainer>
      <StyledCloud1 src={Cloud1} alt="Cloud 1" />
      <StyledCloud2 src={Cloud2} alt="Cloud 2" />
      {/* <DiarySettingWindow>{renderDiarySettingPage()}</DiarySettingWindow> */}

      {diarySettingPage === 2 && (
        <SelectInnerPaper onPageChange={handleDiarySettingPageChange} />
      )}
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
`;

export default RightSticker;
