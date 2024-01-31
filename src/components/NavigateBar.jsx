import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import arrow from '../assets/img/NavigateBar_arrow.png';
import ProfileMenu from './CalendarPage/ProfileMenu';
import useUserInfoStore from '../stores/userInfoStore';

const NavigateBar = ({ locate }) => {
  const [isProfMenuOpen, setIsProfMenuOpen] = useState(false);
  const profMenuRef = useRef(null);
  const userInfoStore = useUserInfoStore();
  const { userInfoList } = userInfoStore;
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUserNickname = localStorage.getItem('loggedInUserNickname');

    if (loggedInUserId && loggedInUserNickname) {
      // 기존 정보를 제거하고 새로운 정보를 추가
      userInfoStore.removeUserInfo(loggedInUserId);
      userInfoStore.addUserInfo(loggedInUserId, loggedInUserNickname);
    }

    // 화면이 처음 마운트될 때는 SweetAlert 창을 띄우지 않도록 추가
    if (
      userInfoStore.userInfoList.length === 0 &&
      showLoginAlert &&
      locate == 'calendar'
    ) {
      Swal.fire({
        icon: 'warning',
        title: '로그인이 필요합니다!',
        text: '로그인을 하고 일기를 작성해 주세요! 😜',
        confirmButtonText: '확인',
        allowOutsideClick: false,
      }).then(() => {
        navigate('/login');
      });
    }
  }, [userInfoStore.userInfoList.length, navigate, showLoginAlert]);
  useEffect(() => {
    setShowLoginAlert(true);
  }, []);

  // userInfoList 배열에서 첫 번째 사용자 정보를 가져옴
  const user =
    userInfoList.length > 0
      ? userInfoList[0]
      : { id: 'Guest', nickname: 'Guest' };
  const { id, nickname } = user;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profMenuRef.current && !profMenuRef.current.contains(event.target)) {
        setIsProfMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfArrowClick = () => {
    setIsProfMenuOpen(!isProfMenuOpen);
  };

  return (
    <NavBar>
      <ProfWrapper>
        <ProfName>환영합니다. {nickname}님</ProfName>
        <ProfArrow
          src={arrow}
          onClick={handleProfArrowClick}
          isopen={isProfMenuOpen}
        />
      </ProfWrapper>

      <ProfileMenuWrapper ref={profMenuRef} isopen={isProfMenuOpen}>
        <ProfileMenu userId={id} userName={nickname} />
      </ProfileMenuWrapper>
    </NavBar>
  );
};

const NavBar = styled.div`
  top: 0;
  width: 108rem;
  height: 6.9375rem;
  background: #c1e3ff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const slideDown = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20%);
    opacity: 0;
  }
`;

const ProfWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-right: 6.5rem;
`;

const ProfName = styled.div`
  color: #fff;
  font-family: 'bmjua';
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const ProfArrow = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isopen }) => (isopen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ProfileMenuWrapper = styled.div`
  position: absolute;
  z-index: 11;
  margin-right: 6rem;
  top: 7rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-name: ${({ isopen }) => (isopen ? slideDown : slideUp)};
  display: ${({ isopen }) => (isopen ? 'block' : 'none')};
`;

export default NavigateBar;
