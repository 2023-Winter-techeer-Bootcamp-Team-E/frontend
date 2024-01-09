import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
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
    Swal.fire({
      title: '로그아웃하시겠습니까?',
      text: '로그아웃 후에는 다시 되돌릴 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 로그아웃합니다',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        // 로그아웃 동작 수행
        // 여기에 로그아웃 로직을 추가하세요.
        navigate('/login'); // 예시에서는 페이지 이동만 했습니다.

        // 로그아웃이 성공했다면 아래와 같이 알림창을 띄워줄 수 있습니다.
        Swal.fire({
          title: '로그아웃되었습니다!',
          text: '로그아웃이 성공적으로 처리되었습니다.',
          icon: 'success',
        });
      }
    });
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
