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
          <StyledText>
            하루
            <br />
            연결
          </StyledText>
        </div>
      </StyledEmptyLogo2>
      <LargeSpring src={spring} style={{ left: '62.56571775%' }} />
    </LargeSketch>
  );
};

const LargeSketch = styled.div`
  width: 103.1875rem; // 130.25rem
  height: 58.6875rem; // 75.7rem
  flex-shrink: 0;
  background: #fff;
  border-radius: 1.5rem;
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
`;

const StyledText = styled.text`
  position: relative;
  color: #2c2c2c;
  bottom: 7rem;
  left: 5rem;
  font-size: 2.4rem;
  font-family: 'seolleim';
  line-height: 1;
`;

export default LargeSketchbook;
