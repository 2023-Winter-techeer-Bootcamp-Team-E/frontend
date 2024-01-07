import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function ProfileMenu({
  userId = 'ProfileUserIdNull',
  userName = 'ProfileUserIdNull',
}) {
  const navigate = useNavigate();

  // tutorial 페이지로 이동
  const handleHaruConnectingTutorialClick = () => {
    navigate('/tutorial');
  };

  //로그아웃 기능 구현
  const handleLogOutClick = () => {
    const confirmLogout = window.confirm('로그아웃하시겠습니까?');

    if (confirmLogout) {
      navigate('/login');
      // 이건 페이지만 이동을 하는거지 로그아웃 기능이 없어서 로그아웃을 하는 기능을 넣어야함.
    }
  };
  return (
    <ProfileMenuFrame>
      <ProfileMenuTop>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 228 86"
          fill="#C6F1FF">
          <rect width="228" height="86" rx="20" fill="#C6F1FF" />
          <rect y="30.0996" width="228" height="54.825" fill="#C6F1FF" />
        </svg>
      </ProfileMenuTop>

      <UserId>{userId}</UserId>

      <UserName>{userName}</UserName>

      <HaruConnectingTutorial onClick={handleHaruConnectingTutorialClick}>
        하루 연결 도움말
      </HaruConnectingTutorial>

      <LogOut onClick={handleLogOutClick}>로그아웃</LogOut>
    </ProfileMenuFrame>
  );
}

const ProfileMenuFrame = styled.div`
  width: 14.25rem;
  height: 15.625rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #e8f7fc;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
`;

const ProfileMenuTop = styled.div`
  position: absolute;
  width: 14.25rem;
  height: 5.375rem;
  flex-shrink: 0;
  z-index: 1;
  svg {
    width: 100%;
    height: 100%;
    fill: none;
  }
`;

const UserId = styled.div`
  position: absolute;
  margin-top: 1.13rem;
  left: 1.06rem;
  z-index: 2;

  color: #aaa;
  text-align: center;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const UserName = styled.div`
  position: absolute;
  margin-top: 3.06rem;
  left: 1.06rem;
  z-index: 2;

  color: #aaa;
  text-align: center;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const HaruConnectingTutorial = styled.div`
  position: absolute;
  margin-top: 6.94rem;
  left: 1.06rem;
  z-index: 2;

  color: #aaa;
  text-align: center;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  cursor: pointer;
  text-decoration: none;
`;

const LogOut = styled.div`
  position: absolute;
  margin-top: 9.88rem;
  left: 1.06rem;
  z-index: 2;

  color: #dd0000;
  text-align: center;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  cursor: pointer;
  text-decoration: none;
`;

export default ProfileMenu;
