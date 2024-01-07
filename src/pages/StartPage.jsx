import React from 'react';
import styled from 'styled-components';
import Book from '../assets/img/Book.png';
import StartButton from '../components/Start/StartButton';
import EmptyLogo from '../assets/img/EmptyLogo.png';
import Papers from '../assets/img/Papers.png';

function StartPage({ move }) {
  return (
    <>
      <BackLayout>
        <PageFrame>
          <PaperWrapper>
            <StyledPapers src={Papers} />
          </PaperWrapper>

          <BookWrapper>
            <StyledBook src={Book} />
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
  z-index: 1;
`;

//바로 시작하기 버튼 위치
const StartButtonWrapper = styled.div`
  position: absolute;
  bottom: 13.8rem;
  right: 39.665rem;
  z-index: 5;
`;

//책 이미지
const StyledBook = styled.img`
  width: 98.74094rem;
  height: 61.61106rem;

  z-index: 4;
`;

const BookWrapper = styled.div`
  position: absolute;
  right: 0rem;
  bottom: 4.08rem;
`;

//뒤에 종이들
const StyledPapers = styled.img`
  position: absolute;
  width: 86.41319rem;
  height: 52.98006rem;
  left: 3.5rem;
  top: -8.6rem;
  z-index: 1;
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
  left: 39.1rem;
  top: 17.1rem;
  width: 32.19981rem;
  height: 33.65313rem;
  flex-shrink: 0;
  z-index: 10;

  img {
    position: relative;
    flex-shrink: 0;
    left: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  div {
    position: absolute;
    top: 8.55rem;
    left: 11.97rem;
    font-size: 4.75rem;
    font-family: 'seolleim';
    margin-top: 0.5rem;
    line-height: 0.9;
  }
`;

export default StartPage;
