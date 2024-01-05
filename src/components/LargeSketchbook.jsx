import React from 'react';
import styled from 'styled-components';
import logo from '../assets/img/Logo_HaruConnecting.png';
import spring from '../assets/img/LargeSpring.png';

const LargeSketchbook = () => {
  return (
    <LargeSketch>
      <LargeSpring src={spring} style={{ left: '3.275590551%' }} />
      <Logo src={logo} />
      <LargeSpring src={spring} style={{ left: '62.56571775%' }} />
    </LargeSketch>
  );
};

const LargeSketch = styled.div`
  width: 103.1875rem;
  height: 58.6875rem;
  flex-shrink: 0;
  background: #fff;
`;
const LargeSpring = styled.img`
  width: 35.25rem;
  height: 3.6875rem;
  flex-shrink: 0;
  position: absolute;
`;
const Logo = styled.img`
  position: absolute;
  top: -8.881922675%;
  left: 41.72986069%;
  width: 17.125rem;
  height: 12.25rem;
`;

export default LargeSketchbook;
