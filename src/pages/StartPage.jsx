import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import Book2 from '../assets/img/Book2.png';
import StartButton from '../components/Start/StartButton';
import EmptyLogo from '../assets/img/EmptyLogo.png';
import Papers2 from '../assets/img/Papers2.png';

function StartPage({ move }) {
  return (
    <>
      <BackLayout>
        <PageFrame>
          <PaperWrapper>
            <StyledPapers src={Papers2} />
          </PaperWrapper>

          <BookWrapper>
            <StyledBook src={Book2} />
          </BookWrapper>
          <StartButtonWrapper>
            <StartButton move={move} />
          </StartButtonWrapper>

          <StyledEmptyLogo>
            <img src={EmptyLogo} />
            <div>
              <p>
                하루
                <br />
                연결
              </p>
            </div>
          </StyledEmptyLogo>
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
  background: linear-gradient(to bottom, #c1e3ff 60%, #ffffff);
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
  // background: #c1e3ff;
  z-index: 1;
`;

//바로 시작하기 버튼 위치
const StartButtonWrapper = styled.div`
  position: absolute;
  bottom: 13.8rem;
  right: 40.6rem;
  z-index: 5;
`;

//책 이미지
const StyledBook = styled.img`
  width: 64.08319rem;
  height: 40.64706rem;
  z-index: 4;
`;

const BookWrapper = styled.div`
  position: absolute;
  right: 21.9rem;
  bottom: 4.08rem;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(9%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

//뒤에 종이들
const StyledPapers = styled.img`
  position: absolute;
  width: 111.05256rem;
  height: 70.87131rem;
  left: -1.3rem;
  top: -13rem;
  z-index: 1;
  animation: ${slideUp} 0.5s ease-out;
`;

const PaperWrapper = styled.div`
  display: flex;
  left: -6.75rem;
  top: 26.5rem;
  z-index: 1;
`;

//로고, 글씨
const StyledEmptyLogo = styled.div`
  position: absolute;
  left: 37.3rem;
  z-index: 10;
  top: 16.2rem;
  animation: ${slideUp} 1s ease-out;


  img {
    width: 32.19981rem;
    height: 33.65313rem;
    flex-shrink: 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  div {
    color: #2C2C2C;
    position: absolute;
    top: 8.55rem;
    left: 10.4rem;
    font-size: 4.75rem;
    font-family: 'seolleim';
    margin-top: 0.5rem;
    line-height: 1.0;
  }
`;

export default StartPage;
