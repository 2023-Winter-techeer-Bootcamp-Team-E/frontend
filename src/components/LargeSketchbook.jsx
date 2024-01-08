import React from 'react';
import styled from 'styled-components';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import spring from '../assets/img/LargeSpring.png';

const LargeSketchbook = () => {
  return (
    <LargeSketch>
      <LargeSpring src={spring} style={{ left: '3.275590551%' }} />
      <StyledEmptyLogo2>
        <img src={EmptyLogo2} alt="EmptyLogo2" />
        <div>
          <p>
            하루<br/>연결
          </p>
        </div>
      </StyledEmptyLogo2>
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

const StyledEmptyLogo2 = styled.div`
  position: absolute;
  top: -6.125rem;
  left: 43.03rem;
  img {
    width: 17.125rem;
    height: 12.25rem;
  }

  div {
    color: #2C2C2C;
    position: absolute;
    top: 2.4rem;
    left: 4.9rem;
    font-size: 2.7rem;
    font-family: 'seolleim';
    margin-top: 0.5rem;
    line-height: 1.0;
  }
`;


export default LargeSketchbook;
