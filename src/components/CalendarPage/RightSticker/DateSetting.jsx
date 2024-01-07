import React from 'react';
import { styled } from 'styled-components';

function DateSetting(props) {
  return (
    <PageFrame>
      <NotifyText>
        <div>친구들과 나의 특별한 순간을 공유할 날짜를 선택해주세요!</div>
      </NotifyText>
    </PageFrame>
  );
}

const PageFrame = styled.div`
  width: 15.1875rem;
  height: 41.0625rem;
  display: flex;
  justify-content: center;
  padding: 1rem;

  color: #000;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;
const NotifyText = styled.div`
  margin-top: 5rem;
`;
export default DateSetting;
