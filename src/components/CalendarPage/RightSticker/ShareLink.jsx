import React, { useState } from 'react';
import { styled } from 'styled-components';
import BackBtn from '../../../assets/img/BackBtn.png';
import DiaryWritePen from '../../../assets/img/DiaryWritePen.png';

function ShareLink() {
  const [diaryMonth, setDiaryMonth] = useState(12);
  const [diaryDay, setDiaryDay] = useState(31);
  const [shareURL, setShareURL] = useState('https://blog.naver.com/hijinoo_');

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareURL)
      .then(() => {
        alert('URL이 복사되었습니다. 친구에게 공유해 보세요!');
      })
      .catch((error) => {
        console.error('클립보드 복사 실패:', error);
        alert('URL 복사에 실패했습니다.');
      });
  };

  return (
    <PageFrame>
      <BackButton src={BackBtn} />

      <SelectDateText>
        <div>
          {diaryMonth}월 {diaryDay}일 일기를
        </div>
        <div>친구들에게 공유해 봐요!</div>
      </SelectDateText>

      <ShareURL>{shareURL}</ShareURL>
      <CopyBtn onClick={copyToClipboard}>복사</CopyBtn>
      <Line />
      <LetsWriteText>일기를 작성하러 가볼까요?</LetsWriteText>
      <WriteDiaryBtn>
        작성하기 <DiaryWritePenIcon src={DiaryWritePen} />
      </WriteDiaryBtn>
    </PageFrame>
  );
}
const PageFrame = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
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
export default ShareLink;
