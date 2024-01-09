import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function NotificationMenu({
  userId = 'ProfileUserIdNull',
  userName = 'ProfileUserIdNull',
  guestInfo = [
    { month: '1', day: '3', guestName: '이지훈' },
    { month: '1', day: '15', guestName: '김상훈' },
    { month: '2', day: '7', guestName: '이영희' },
    { month: '2', day: '20', guestName: '박영수' },
    { month: '3', day: '6', guestName: '조진우' },
    { month: '3', day: '25', guestName: '정민재' },
    { month: '4', day: '12', guestName: '강서연' },
    { month: '4', day: '28', guestName: '윤현우' },
    { month: '5', day: '1', guestName: '송지아' },
    { month: '5', day: '18', guestName: '임승현' },
    { month: '6', day: '6', guestName: '신미경' },
    { month: '6', day: '22', guestName: '서도윤' },
    { month: '7', day: '4', guestName: '김태민' },
    { month: '7', day: '16', guestName: '장하윤' },
    { month: '8', day: '10', guestName: '황지원' },
    { month: '8', day: '27', guestName: '백예린' },
    { month: '9', day: '5', guestName: '한재호' },
    { month: '9', day: '19', guestName: '진예진' },
    { month: '10', day: '8', guestName: '유승준' },
    { month: '10', day: '24', guestName: '양재은' },
    { month: '11', day: '11', guestName: '하민호' },
    { month: '11', day: '30', guestName: '고은우' },
    { month: '12', day: '13', guestName: '조민지' },
    { month: '12', day: '31', guestName: '신준호' },
  ],
}) {
  const navigate = useNavigate();

  const notifications = guestInfo.map((info, index) => (
    <Notification key={index}>
      <div>
        <BoldText>
          {info.month}월 {info.day}일
        </BoldText>
        에 <BoldText>{info.guestName}님</BoldText>이 일기를 작성했습니다.
      </div>
      <div>지금 클릭해서 확인해 보세요!</div>
    </Notification>
  ));

  return (
    <NotificationMenuFrame>
      <NotificationMenuContent>{notifications}</NotificationMenuContent>
    </NotificationMenuFrame>
  );
}

const NotificationMenuFrame = styled.div`
  width: 28rem;
  height: 32.4375rem;
  border-radius: 1.25rem;
  background: #e8f7fc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

// 스크롤 할 컨테이너
const NotificationMenuContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem;
  justify-content: center;
`;

const Notification = styled.div`
  background: #ffffff;
  width: 24.625rem;
  height: 4.75rem;
  flex-shrink: 0;
  width: 24.625rem;
  height: 4.75rem;
  border-radius: 1.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-left: 1rem;
  margin-bottom: 1.44rem;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

const BoldText = styled.span`
  font-weight: bold;
`;

export default NotificationMenu;
