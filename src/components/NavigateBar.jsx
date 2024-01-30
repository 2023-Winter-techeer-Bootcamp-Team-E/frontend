import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import arrow from '../assets/img/NavigateBar_arrow.png';
import ProfileMenu from './CalendarPage/ProfileMenu';
import useUserInfoStore from '../stores/userInfoStore';

const NavigateBar = () => {
  const [isProfMenuOpen, setIsProfMenuOpen] = useState(false);
  const profMenuRef = useRef(null);
  const userInfoStore = useUserInfoStore();
  const { userInfoList } = userInfoStore;

  // userInfoList 배열에서 첫 번째 사용자 정보를 가져옴
  const user =
    userInfoList.length > 0
      ? userInfoList[0]
      : { id: 'null', nickname: 'null' };
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
      {/* <BellImg
        src={bell}
        onClick={handleNotifyArrowClick}
        isopen={isNotifyMenuOpen}
      /> */}
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

      {/* <NotificationMenuWrapper ref={notifyMenuRef} isopen={isNotifyMenuOpen}>
        <NotificationMenu />
      </NotificationMenuWrapper> */}
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

const BellImg = styled.img`
  position: absolute;
  width: 4.625rem;
  height: 4.625rem;
  margin-right: 29.55rem;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    animation: shake 0.5s ease-in-out infinite;
  }

  @keyframes shake {
    0% {
      transform: rotate(-5deg);
    }
    50% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(-5deg);
    }
  }
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

const NotificationMenuWrapper = styled.div`
  position: absolute;
  z-index: 11;
  margin-right: 28em;
  top: 7rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-name: ${({ isopen }) => (isopen ? slideDown : slideUp)};
  display: ${({ isopen }) => (isopen ? 'block' : 'none')};
  cursor: pointer;
`;

export default NavigateBar;
