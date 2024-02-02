import React from 'react';
import styled from 'styled-components';
import EmptyLogo2 from '../assets/img/EmptyLogo2.png';
import SmallSketchbookImage from '../assets/img/SmallSketchbook.png'; // 변수명 변경

const SmallSketchbook = () => {
  return (
    <SmallSketch>
      <StyledSmallSketchbook src={SmallSketchbookImage} alt="SmallSketchbook" />{' '}
      {/* 변수명 변경 */}
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
    </SmallSketch>
  );
};

const SmallSketch = styled.div`
  position: absolute;
  // width: 60.75rem;
  // height: 50.8125rem;
  // background: #fff;
  top: 2rem;
  bottom: 0;
  z-index: 1;
  border-radius: 1.5rem;
`;

const StyledSmallSketchbook = styled.img`
  width: 55.75rem;
  height: 55.8125rem;
  bottom: 0;
  z-index: 1;
`;

const StyledEmptyLogo2 = styled.div`
  position: absolute;
  left: 19.8rem;
  top: -3.5rem;
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

export default SmallSketchbook;
