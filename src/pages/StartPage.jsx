import React from 'react';
import styled from 'styled-components';
import StartBookImg from '../assets/img/StartBookImg.png';
import StartButton from '../components/Start/StartButton';

function StartPage() {
  return (
    <>
      <BackLayout>
        <PageFrame>
          <BookWrapper>
            <StyledStartBook src={StartBookImg} alt="StartBook" />
          </BookWrapper>

          <StartButtonWrapper>
            <StartButton />
          </StartButtonWrapper>
        </PageFrame>
      </BackLayout>
    </>
  );
}

const BackLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: #c1e3ff;
  overflow: hidden;
`;

const PageFrame = styled.div`
  position: absolute;
  width: 108rem; /* 수정된 부분: 원하는 너비 설정 */
  height: 70rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column; /* 세로로 정렬되도록 수정 */
  align-items: center;
  justify-content: center;
  background: #c1e3ff;
`;

const BookWrapper = styled.div`
  margin-top: 14.75%;
`;

const StartButtonWrapper = styled.div`
  position: absolute;
  margin-bottom: -22%;
`;

const StyledStartBook = styled.img`
  position: relative;
  left: 9%;
  width: 97%;
  height: 70%;
`;

export default StartPage;
