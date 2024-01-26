import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { baseInstance } from '../../api/config';
import useUserInfoStore from '../../stores/userInfoStore';
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
      <UserName>{userName}</UserName>
      <UserId>{userId}</UserId>
      <BottomFrame>
        <HaruConnectingTutorial onClick={handleHaruConnectingTutorialClick}>
          Tutorial
        </HaruConnectingTutorial>
        <LogOut onClick={handleLogOutClick}>Logout</LogOut>
      </BottomFrame>
    </ProfileMenuFrame>
  );
}
const ProfileMenuFrame = styled.div`
  width: 12.75rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.625rem;
  background: #ebf2fc;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
  justify-content: center;
`;
const UserName = styled.div`
  z-index: 2;
  margin-top: 1rem;
  color: #000;
  text-align: center;
  font-family: 'bmjua';
  font-size: 1rem;
`;
const UserId = styled.div`
  z-index: 2;
  margin-top: 0.375rem;
  color: #aaa;
  text-align: center;
  font-family: 'bmjua';
  font-size: 1rem;
`;
const BottomFrame = styled.div`
  display: flex;
  margin-top: 1.675rem;
  width: 100%;
  height: 2.5rem;
  justify-content: center;
  flex-direction: row;
`;
const HaruConnectingTutorial = styled.div`
  width: 5.375rem;
  height: 2.5rem;
  z-index: 2;
  margin: 0.375rem;
  color: #aaa;
  text-align: center;
  font-family: 'bmjua';
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );
`;
const LogOut = styled.div`
  width: 5.375rem;
  height: 2.5rem;
  margin: 0.375rem;
  z-index: 2;
  color: #dd0000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'bmjua';
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.2)
  );
`;
export default ProfileMenu;
