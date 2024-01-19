import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { baseInstance } from '../../api/config';
import useUserInfoStore from '../../store/UserInfoStore';
function ProfileMenu({
  userId = 'ProfileUserIdNull',
  userName = 'ProfileUserIdNull',
}) {
  const navigate = useNavigate();
  const userInfoStore = useUserInfoStore();
  const handleHaruConnectingTutorialClick = () => {
    navigate('/tutorial');
  };

  const handleLogOutClick = () => {
    Swal.fire({
      title: '로그아웃하시겠습니까?',
      text: '로그아웃 후에는 다시 되돌릴 수 없습니다!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 로그아웃합니다',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await baseInstance.post('/members/logout/', {});
          // 여기서 로그아웃 성공 여부 확인
          if (response.data.code === 'A002' && response.status === 200) {
            Swal.fire({
              title: '로그아웃되었습니다!',
              text: '로그아웃이 성공적으로 처리되었습니다.',
              icon: 'success',
            }).then(() => {
              userInfoStore.removeUserInfo(
                localStorage.getItem('loggedInUserId'),
              );
              localStorage.removeItem('loggedInUserId');
              navigate('/'); // 여기서 네비게이션 호출
              deleteCookie('sessionId'); // 쿠키 삭제 함수 호출
            });
          } else {
            // 로그아웃 실패 시 처리
            Swal.fire({
              title: '로그아웃 실패',
              text: '로그아웃 중에 문제가 발생했습니다.',
              icon: 'error',
            });
          }
        } catch (error) {
          // API 호출 중 오류 처리
          console.error('API 호출 중 오류 발생:', error);
          Swal.fire({
            title: '로그아웃 실패',
            text: '로그아웃 중에 문제가 발생했습니다.',
            icon: 'error',
          });
        }
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
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
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
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
export default ProfileMenu;
