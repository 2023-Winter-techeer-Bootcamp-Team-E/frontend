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
      <UserId />
      <UserName />
      <HaruConnectingHelp />
      <LogOut />
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
  svg {
    width: 100%;
    height: 100%;
    fill: none;
  }
`;

// ProfileMenuTop에 대한 스타일 적용
const ProfileMenuTop = styled.div`
  width: 14.25rem;
  height: 5.375rem;
  flex-shrink: 0;
`;

// UserId에 대한 스타일 적용
const UserId = styled.div`
  /* 여기에 UserId에 대한 스타일을 추가하세요 */
`;

// UserName에 대한 스타일 적용
const UserName = styled.div`
  /* 여기에 UserName에 대한 스타일을 추가하세요 */
`;

// HaruConnectingHelp에 대한 스타일 적용
const HaruConnectingHelp = styled.div`
  /* 여기에 HaruConnectingHelp에 대한 스타일을 추가하세요 */
`;

// LogOut에 대한 스타일 적용
const LogOut = styled.div`
  /* 여기에 LogOut에 대한 스타일을 추가하세요 */
`;

export default ProfileMenu;
