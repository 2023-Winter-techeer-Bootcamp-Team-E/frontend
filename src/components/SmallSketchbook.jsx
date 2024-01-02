import React from 'react';
import styled from 'styled-components';
import logo from '../../public/img/Logo_HaruConnecting.png';
import spring from '../../public/img/SmallSpring.png';

const SmallSketchbook = () => {
    return (
        <CenterDiv>
            <SmallSketch>
                <SmallSpring src={spring} style={{ left: '5.563786008%' }} />
                <Logo src={logo} />
                <SmallSpring src={spring} style={{ left: '70.37037037%' }} />
            </SmallSketch>
        </CenterDiv>
    );
};

const CenterDiv = styled.div`
 position: absolute;
 top: 0%;
 width: 103.1875rem;
  height: 58.6875rem;
  left: 50%;
  transform: translateX(-50%);
`
const SmallSketch = styled.div`
position: absolute;
width: 60.75rem;
height: 59.8125rem;
background: #FFF;
top: 7.9375rem;
left: 2.6rem;
`
const SmallSpring = styled.img`
width: 14.625rem;
height: 3.6875rem;
position: absolute;
top: 0rem;
bottom:56.1rem;
`
const Logo = styled.img`
position: absolute;
top : -8.881922675%;
left : 35.901234567%;
width: 17.125rem;
height: 12.25rem;
`
export default SmallSketchbook;