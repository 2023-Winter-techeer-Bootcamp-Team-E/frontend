import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import bell from '../assets/img/NavigateBar_bell.png';
import arrow from '../assets/img/NavigateBar_arrow.png';
import ProfileMenu from './CalendarPage/ProfileMenu';
import NotificationMenu from './CalendarPage/NotificationMenu';

const NavigateBar = ({
  userName = 'NavigatgeBarUserNameNull',
  userId = 'NavigateBarUserIdNull',
  isNotifyMenuOpen, // 추가: NavigateBar에서 prop으로 받아옴
  isProfMenuOpen, // 추가: NavigateBar에서 prop으로 받아옴
  handleNotifyArrowClick, // 추가: NavigateBar에서 prop으로 받아옴
  handleProfArrowClick, // 추가: NavigateBar에서 prop으로 받아옴
}) => {
  const profMenuRef = useRef(null);
  const notifyMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profMenuRef.current && !profMenuRef.current.contains(event.target)) {
      }
      if (
        notifyMenuRef.current &&
        !notifyMenuRef.current.contains(event.target)
      ) {
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavBar>
      <BellImg
        src={bell}
        onClick={handleNotifyArrowClick}
        isOpen={isNotifyMenuOpen}
      />
      <ProfWrapper>
        <ProfName>환영합니다. {userName}님</ProfName>
        <ProfArrow
          src={arrow}
          onClick={handleProfArrowClick}
          isOpen={isProfMenuOpen}
        />
      </ProfWrapper>

      <ProfileMenuWrapper ref={profMenuRef} isOpen={isProfMenuOpen}>
        <ProfileMenu userId={userId} userName={userName} />
      </ProfileMenuWrapper>

      <NotificationMenuWrapper ref={notifyMenuRef} isOpen={isNotifyMenuOpen}>
        <NotificationMenu />
      </NotificationMenuWrapper>
    </NavBar>
  );
};

const NavBar = styled.div`
  top: 0;
  width: 108rem;
  height: 7.9375rem;
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
  font-family: Arial Black;
  font-size: 1.5rem;
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
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
`;

const ProfileMenuWrapper = styled.div`
  position: absolute;
  z-index: 11;
  margin-right: 6rem;
  top: 7rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-name: ${({ isOpen }) => (isOpen ? slideDown : slideUp)};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const NotificationMenuWrapper = styled.div`
  position: absolute;
  z-index: 11;
  margin-right: 28em;
  top: 7rem;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
  animation-name: ${({ isOpen }) => (isOpen ? slideDown : slideUp)};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  cursor: pointer;
`;

export default NavigateBar;
