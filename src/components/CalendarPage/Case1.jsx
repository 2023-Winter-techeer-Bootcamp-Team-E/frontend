import React from 'react';
import { styled } from 'styled-components';
import './DateNotification.css';
import RightNotificationImgLogo from '../../assets/img/RightNotificationImgLogo.png';
import RightNotificationImgBubble from '../../assets/img/RightNotificationImgBubble.png';

const Case1 = ({}) => {
  return (
    <RightStickerContainer>
      <DiarySettingWindow>
        <DiarySettingImgLogo src={RightNotificationImgLogo} />
        <DiarySettingImgBubble src={RightNotificationImgBubble} />
        <DiarySettingText>
          <div>친구들과 나의 특별한 순간을 작성할 날짜를 선택해주세요!</div>
        </DiarySettingText>
      </DiarySettingWindow>
    </RightStickerContainer>
  );
};

const RightStickerContainer = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  border-radius: 1.875rem;
  background: #e7eef9;
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

const DiarySettingImgLogo = styled.img`
  position: absolute;
  width: 15.1875rem;
  height: 15.80469rem;
  flex-shrink: 0;
  display: flex;
  margin-top: 20rem;
`;
const DiarySettingImgBubble = styled.img`
  position: absolute;
  width: 14.25rem;
  height: 13rem;
  flex-shrink: 0;
  display: flex;
  margin-top: 7.56rem;
`;

const DiarySettingText = styled.div`
  position: absolute;
  width: 10rem;
  color: #000;
  font-family: 'mong';
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  display: flex;
  margin-top: 11.12rem;
`;

export default Case1;
