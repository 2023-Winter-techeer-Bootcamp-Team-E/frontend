import React from 'react';
import styled from 'styled-components';
import SadLogo from '../assets/img/SadLogo.png';

function MinScreenWarning(props) {
  return (
    <div>
      <WarningWrapper>
        <WarnMessage>
          화면 창 사이즈가 너무 작아요! 좀 더 늘려주시길 바랍니다!
        </WarnMessage>
        <StyledSadLogo src={SadLogo} alt="SadLogo" />
      </WarningWrapper>
    </div>
  );
}
const WarningWrapper = styled.div`
  background-color: #f8f8f8;
`;

const WarnMessage = styled.div`
  color: #2c2c2c;
  font-family: 'bmjua';
  font-size: 1.625rem;
  position: absolute;
  top: 9.8rem;
  left: 8.15rem;
`;

const StyledSadLogo = styled.div`
  position: absolute;
  top: 0.56rem;
  left: 7.95rem;
  width: 33.16231rem;
  height: 32.9375rem;
  flex-shrink: 0;
  z-index: 5;

  img {
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }
`;

export default MinScreenWarning;
