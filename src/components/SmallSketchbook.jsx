import React from 'react';
import styled from 'styled-components';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import spring from '../assets/img/SmallSpring.png';

const SmallSketchbook = () => {
  return (
    <SmallSketch>
      <SmallSpring src={spring} style={{ left: '5.563786008%' }} />
      <StyledEmptyLogo2>
        <img src={EmptyLogo2} alt="EmptyLogo2" />
        <div>
          <p>
            하루<br/>연결
          </p>
        </div>
      </StyledEmptyLogo2>
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

const StyledEmptyLogo2 = styled.div`
  position: absolute;
  left: 22.6rem;
  top: -6.0rem;
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

export default SmallSketchbook;
