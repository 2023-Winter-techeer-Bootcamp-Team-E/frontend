import React from 'react';
import styled from 'styled-components';

function ProfileMenu(props) {
  return (
    <ProfileMenuFrame>
      <ProfileMenuTop />
      <UserId />
      <UserName />
      <HaruConnectingHelp />
      <LogOut />
    </ProfileMenuFrame>
  );
}

// ProfileMenuFrame에 대한 스타일 적용
const ProfileMenuFrame = styled.div`
  /* 여기에 ProfileMenuFrame에 대한 스타일을 추가하세요 */
`;

// ProfileMenuTop에 대한 스타일 적용
const ProfileMenuTop = styled.div`
  /* 여기에 ProfileMenuTop에 대한 스타일을 추가하세요 */
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
