import React from 'react';
import styled from 'styled-components';
import logo from '../assets/img/Logo_HaruConnecting.png';
import spring from '../assets/img/SmallSpring.png';

const SmallSketchbook = () => {
  return (
    <SmallSketch>
      <SmallSpring src={spring} style={{ left: '5.563786008%' }} />
      <Logo src={logo} />
      <SmallSpring src={spring} style={{ left: '70.37037037%' }} />
    </SmallSketch>
  );
};

const SmallSketch = styled.div`
  position: absolute;
  width: 60.75rem;
  height: 59.8125rem;
  background: #fff;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
const SmallSpring = styled.img`
  width: 14.625rem;
  height: 3.6875rem;
  position: absolute;
  top: 0rem;
  bottom: 56.1rem;
`;
const Logo = styled.img`
  position: absolute;
  top: -8.881922675%;
  left: 35.901234567%;
  width: 17.125rem;
  height: 12.25rem;
`;
export default SmallSketchbook;
