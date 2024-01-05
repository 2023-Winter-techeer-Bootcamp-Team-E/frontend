import React from 'react';
import styled from 'styled-components';

function ProfileMenu(props) {
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
      <UserId>UserIdNull</UserId>
      <UserName>UserNameNull</UserName>
      <HaruConnectingHelp>하루 연결 도움말</HaruConnectingHelp>
      <LogOut>로그아웃</LogOut>
    </ProfileMenuFrame>
  );
}

// ProfileMenuFrame에 대한 스타일 적용
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

// ProfileMenuTop에 대한 스타일 적용
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

// UserId에 대한 스타일 적용
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

// UserName에 대한 스타일 적용
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

// HaruConnectingHelp에 대한 스타일 적용
const HaruConnectingHelp = styled.div`
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

// LogOut에 대한 스타일 적용
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
