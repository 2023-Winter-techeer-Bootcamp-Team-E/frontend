import React from 'react';
import styled from 'styled-components';
import bell from '../../public/img/NavigateBar_bell.png';
import arrow from '../../public/img/NavigateBar_arrow.png';

const NavigateBar = () => {
  let userName = '조진우';
  return (
    <>
      <NavBar>
        <BellImg src={bell} />
        <ProfName>환영합니다. {userName}님</ProfName>
        <ProfArrow src={arrow} />
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  width: 108rem;
  height: 7.9375rem;
  background: #c1e3ff;
`;
const BellImg = styled.img`
  position: absolute;
  width: 4.625rem;
  height: 4.625rem;
  left: 82.0625rem;
  right: 24.9375rem;
  top: 1.5625rem;
  bottom: 1.5625rem;
`;

const ProfName = styled.div`
  width: 15.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  position: absolute;
  left: 88.44rem;
  right: 4.44rem;
  top: 3.31rem;
  bottom: 3.5rem;
  color: #fff;
  font-family: Arial Black;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const ProfArrow = styled.img`
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  left: 97.75rem;
  right: 3.5rem;
  bottom: 3.44rem;
  top: 3.75rem;
`;
export default NavigateBar;
