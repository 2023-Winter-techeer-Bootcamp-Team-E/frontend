import React from 'react';
import styled from 'styled-components';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import LargeSketchbookImg from '../assets/img/LargeSketchbook.png';

const LargeSketchbook = () => {
  return (
    <LargeSketch>
      <StyledLargeSketchbook
        src={LargeSketchbookImg}
        alt="LargeSketchbookImg"
      />
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
    </LargeSketch>
  );
};

const StyledLargeSketchbook = styled.img`
  position: absolute;
  top: -2.3rem;
  left: -1rem;
  width: 110rem; // 130.25rem
  height: 58.4rem; // 75.7rem
`;
const LargeSketch = styled.div`
  width: 103.1875rem; // 130.25rem
  height: 58.6875rem; // 75.7rem
  flex-shrink: 0;
  // background: #fff;
  border-radius: 1.5rem;
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

const StyledText = styled.div`
  position: relative;
  color: #2c2c2c;
  bottom: 7rem;
  left: 5rem;
  font-size: 2.4rem;
  font-family: 'seolleim';
  line-height: 1;
`;

export default LargeSketchbook;
