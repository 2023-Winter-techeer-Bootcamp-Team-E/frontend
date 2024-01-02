import React from 'react';
import styled from 'styled-components';
import logo from '../../public/img/Logo_HaruConnecting.png';
import spring from '../../public/img/LargeSpring.png';

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
position: absolute;
  width: 103.1875rem;
  height: 58.6875rem;
  flex-shrink: 0;
  background: #FFF;
  top: 7.9375rem;
left: 50%;
transform: translateX(-50%);
`
const LargeSpring = styled.img`
width: 35.25rem;
height: 3.6875rem;
flex-shrink: 0;
position: absolute;
top: 0rem;
bottom:55rem;
`
const Logo = styled.img`
position: absolute;
top : -8.881922675%;
left : 41.72986069%;
width: 17.125rem;
height: 12.25rem;
`

export default LargeSketchbook;